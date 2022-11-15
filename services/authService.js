import request from "../utils/request";

export const login = async (info) => {
  try {
    const res = await request.post("/api/admin/login", info);
    return res.data;
  } catch (error) {
    console.log("login", error);
    return error.response.data;
  }
};
