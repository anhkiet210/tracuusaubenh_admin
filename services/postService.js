import request from "../utils/request";

export const getAllPostPending = async () => {
  try {
    const res = await request.get("/api/post/get-post-pending");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const acceptPost = async (id) => {
  try {
    const res = await request.put(`/api/post/accept-post/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const denyPost = async (id) => {
  try {
    const res = await request.put(`/api/post/deny-post/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
