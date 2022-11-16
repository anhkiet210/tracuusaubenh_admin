import request from "../utils/request";

export const getAllUser = async () => {
  try {
    const res = await request.get("/api/users");
    return res.data;
  } catch (error) {
    return error;
  }
};

