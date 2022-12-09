import { put, get } from "../utils/request";

export const getAllPostPending = async () => {
  try {
    const res = await get("/api/post/get-all-post-pending");
    return res;
  } catch (error) {
    return error;
  }
};

export const changeStatusPost = async (id, option) => {
  try {
    const res = await put(`/api/post/change-status-post/${id}`, option);
    return res;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const denyPost = async (id) => {
  try {
    const res = await put(`/api/post/deny-post/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
