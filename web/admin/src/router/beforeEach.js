import store from "@/store";
import {getAuthenticated} from "@/services/auth";
import {api} from "@/services"
import {PROJECT_NAME, PROJECT_TYPE} from "../../env.json";

export default async (to, from, next) => {
  // settings
  document.title = `${to.name} - ${PROJECT_NAME} ${PROJECT_TYPE}`;
  if (to.name !== from.name) window.scrollTo(0, 0);

  // handle auth state
  const requiredAuth = to.meta.requiredAuth || false;
  const preventAuth = to.meta.preventAuth || false;
  const authenticated = !!store.getters.accessToken;

  // if the user has not authenticated and tries access private page
  if (requiredAuth && !authenticated) return next("/auth");

  // if the user has authenticated and tries access prevent authenticated page
  if (preventAuth && authenticated) return next("/auth");

  // Permission Check (route)
  if (!!to.meta && !!to.meta.permissions && to.meta.permissions.length) {
    const permissions = await getPermissions();
    if (to.meta.permissions.some(e => !permissions[e]))
      return next("/");
  }

  // else... next
  next();
};

async function getPermissions() {
  api.defaults.headers.common["Authorization"] = store.getters.accessToken;

  return store.getters.permissions || await getAuthenticated().then(({permissions}) => permissions).catch(() => ({}));
}
