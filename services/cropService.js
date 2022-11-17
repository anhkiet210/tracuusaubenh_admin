import request from "../utils/request";

export const getAllCrops = async () => {
  try {
    const res = await request.get("/api/crop/");
    return res.data;
  } catch (error) {
    return error;
  }
};
