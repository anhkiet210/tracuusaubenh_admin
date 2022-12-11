import { get } from "../utils/request";

export const getAllStatistical = async () => {
  try {
    const res = await get("/api/statistical");
    return res;
  } catch (error) {
    return error;
  }
};
