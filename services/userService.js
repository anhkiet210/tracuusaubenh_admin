import { get } from "../utils/request";

export const getAllUser = async () => {
  try {
    const res = await get("/api/users");
    return res;
  } catch (error) {
    return error;
  }
};
