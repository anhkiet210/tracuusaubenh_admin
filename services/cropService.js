import { get, post } from "../utils/request";

export const getAllCrops = async () => {
  try {
    const res = await get("/api/crop/");
    return res;
  } catch (error) {
    return error;
  }
};

export const createCrop = async (info) => {
  try {
    const res = await post("/api/crop/create", info);
    return res;
  } catch (error) {
    return error;
  }
};
