import { get, post } from "../utils/request";

export const getAllPests = async () => {
  try {
    const res = await get("/api/pest");
    return res;
  } catch (error) {
    return error;
  }
};

export const createPest = async (info) => {
  try {
    const res = await post("/api/pest/create", info);
    return res;
  } catch (error) {
    return error;
  }
};
