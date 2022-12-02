import { get, post } from "../utils/request";

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
