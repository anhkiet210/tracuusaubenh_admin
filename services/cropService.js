import request from "../utils/request";

export const getAllCrops = async () => {
  try {
    const res = await request.get("/api/crop/");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createCrop = async (info) => {
  try {
    const res = await request.post("/api/crop/create", info);
    return res.data;
  } catch (error) {
    return error;
  }
};
