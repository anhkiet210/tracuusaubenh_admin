import { get, post, put } from "../utils/request";

export const login = async (info) => {
  try {
    const res = await post("/api/admin/login", info);
    return res;
  } catch (error) {
    // console.log("login", error);
    return error;
  }
};

export const getInfo = async () => {
  try {
    const res = await get("/api/admin/get-info");
    return res;
  } catch (error) {
    return error;
  }
};

export const changePassword = async (info) => {
  try {
    const res = await put("/api/admin/change-password", info);
    return res;
  } catch (error) {
    return error;
  }
};

export const changeAvatar = async (info) => {
  try {
    const res = await put("/api/admin/change-avatar", info);
    return res;
  } catch (error) {
    return error;
  }
};

export const UpdateInfo = async (info) => {
  try {
    const res = await put("/api/admin/update-info", info);
    return res;
  } catch (error) {
    return error;
  }
};
