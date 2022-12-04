import { get, post } from "../utils/request";

export const getAllPesticides = async () => {
  try {
    const res = await get("/api/pesticide");
    return res;
  } catch (error) {
    return error;
  }
};

export const createPesticide = async (info) => {
  try {
    const res = await post("/api/pesticide/create", info);
    return res;
  } catch (error) {
    return error;
  }
};
