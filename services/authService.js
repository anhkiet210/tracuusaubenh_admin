import request from "../utils/request";

export const login = async (info) => {
  try {
    const res = await request.post("/api/admin/login", info);
    return res.data;
  } catch (error) {
    console.log("login", error);
    return error;
  }
};

export const getInfo = async () => {
  try {
    const res = await request.get("/api/admin/get-info");
    return res.data;
  } catch (error) {
    return error;
  }
};

