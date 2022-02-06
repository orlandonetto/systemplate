import axios from "axios";
import store from "@/store";

import {API_BASE_URL, TIMEOUT} from '../../env.json';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
});

// request
export async function request(method, url, data, headers = {}) {
  return await new Promise((resolve, reject) => {
    try {
      url = url.replaceAll("undefined", "");

      api[method](url, data, {headers: headers})
        .then((res) => resolve(res.data))
        .catch((err) => reject(err.response));
    } catch (err) {
      return reject(err);
    }
  });
}

// interceptor
api.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => responseFailed(err)
);

const responseFailed = (err) => {
  // server error
  if ((err === "Error: Network Error" || err.response.status >= 500) && !!store.getters.accessToken)
    return signOutLocal(err);

  // unauthorized
  if ([401, 403].includes(err.response.status)) {
    const refreshToken = store.getters.refreshToken;

    // Previne infinity sign-out requests
    const ignoredRoutes = ['/account/refresh-token', "/account/sign-out"]
    if (ignoredRoutes.includes(err.config.url)) return signOutLocal(err);

    if (!refreshToken) return signOutLocal(err);

    // Try RefreshToken and resend request
    return axios
      .post(`${API_BASE_URL}/account/refresh-token`, {refreshToken})
      .then(({data}) => {
        store.dispatch("setTokens", data);

        // 'err.config' is a Original Request
        err.config.headers["Authorization"] = data.accessToken;

        // Resend Request
        const reqResent = axios(err.config);
        return Promise.resolve(reqResent);
      })
      .catch(() => {
        return signOutLocal(err)
      });
  }

  return Promise.reject(err);
};

function signOutLocal(err) {
  console.log('sign-out local')
  store.dispatch("setSignOutLocal");
  return Promise.reject(err);
}
