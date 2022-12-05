import { get, deleteMethod } from "../utils/request";

export const getAllUser = async () => {
  try {
    const res = await get("/api/users");
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await deleteMethod(`/api/users/delete/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
