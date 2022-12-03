import dynamic from "next/dynamic";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

//func
import {
  setShowModalInputNote,
  setShowModalPostDetail,
} from "../../../redux/slice/modalSlice";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { changeStatusPost } from "../../../services/postService";
import { deletePostPending } from "../../../redux/slice/postSlice";

//component
import Modal from "../index";
import Spinner from "../../Spinner";

const Editor = dynamic(() => import("./components/Editor"), { ssr: false });

function ModalPostDetail({ post }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.loading);
  // console.log("modal input note: ", showModalInputNote);

  const handCloseModal = () => {
    dispatch(setShowModalPostDetail(false));
  };

  const handleAcceptPost = async (id) => {
    try {
      dispatch(setLoading(true));
      const info = {
        status: "Đã duyệt",
        note: "",
      };

      const res = await changeStatusPost(id, info);
      console.log("accept post: ", res);

      if (res?.code === "ERR_NETWORK") {
        enqueueSnackbar("Lỗi kết nối server!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        dispatch(setLoading(false));
        return;
      }

      if (res?.code === "ERR_BAD_RESPONSE") {
        enqueueSnackbar(res?.response?.data?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
        dispatch(setLoading(false));
        return;
      }

      if (res?.response?.status === 401) {
        enqueueSnackbar("Hãy đặng nhập để thực hiện chức năng này!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        dispatch(setLoading(false));
        return;
      }

      if (res?.response?.status === 404) {
        enqueueSnackbar("Không tìm thấy bài viết!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        dispatch(setLoading(false));
        return;
      }
      enqueueSnackbar(res?.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
      dispatch(deletePostPending(id));
      dispatch(setLoading(false));
      dispatch(setShowModalPostDetail(false));
    } catch (error) {
      dispatch(setLoading(false));
      enqueueSnackbar("Lỗi duyệt bài viết", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleShowModalInputNote = () => {
    dispatch(setShowModalInputNote(true));
    dispatch(setShowModalPostDetail(false));
  };


  return (
    <>
      <Modal title="Thông tin bài viết" handleClose={handCloseModal}>
        <form autoComplete="off">
          <div className="form-group">
            <h3 className="form-label text-white">Tiêu đề</h3>
            <input
              type="text"
              placeholder="Nhập tiêu đề bài viết..."
              className="form-input"
              readOnly
              defaultValue={post?.tieude}
            />
          </div>
          <div className="form-group">
            <label className="form-label text-white">Ảnh bài viết</label>
            <div className="flex items-center justify-center flex-col w-full duration-200">
              <div className="w-1/2 animate-toLeft-hand">
                <img src={post?.anh} alt="" className="w-full object-contain" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <h3 className="form-label text-white">Nội dung</h3>
            <Editor data={post?.noidung} />
          </div>
          <div className="form-group flex items-center justify-between">
            <button
              className="btn-submit bg-sky-500 btn-disabled"
              type="button"
              onClick={() => handleAcceptPost(post?._id)}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Duyệt"}
            </button>
            <button
              className="btn-submit bg-red-400"
              type="button"
              onClick={handleShowModalInputNote}
            >
              Từ chối
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ModalPostDetail;
