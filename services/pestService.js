import request from "../utils/request";

export const getAllPests = async () => {
  try {
    const res = await request.get("/api/pest");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createPest = async (info) => {
  try {
    const res = await request.post("/api/pest/create", info);
    return res.data;
  } catch (error) {
    return error;
  }
};
