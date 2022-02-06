import {request} from "./index";

export const createAdmin = (data) => request("post", "/sign-up", data);

export const getAdmins = (data) => request("get", `/user/list?page=${data.page}&size=${data.size}`);

export const getAdmin = (data) => request("get", `/user/me`);

export const getMe = () => request("get", `/user/me`);

export const updateAdmin = (data) => request("post", "/user/change-profile", data);

export const updateAdminStatus = (data) => request("post", "/user/update-status", data);
