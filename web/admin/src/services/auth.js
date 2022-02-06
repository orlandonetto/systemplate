import {request} from "./index";

// todo temp
const permissions = {
  name: 'Admin',
  user_access: true,
  user_edit: true,
  admin_access: true,
  admin_edit: true,
  support_access: true,
  financial_access: true,
}

export const signIn = (data) => request("post", "/account/sign-in", data)
  .then(res => ({accessToken: res.accessToken, refreshToken: res.refreshToken}));

export const signOut = () => request("post", "/account/sign-out");

export const getAuthenticated = () => request("get", "/account/me")
  .then(res => ({account: res, permissions}));