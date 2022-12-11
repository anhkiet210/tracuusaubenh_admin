import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

// components
import CardLineChart from "../../components/Cards/CardLineChart.jsx";
import CardBarChart from "../../components/Cards/CardBarChart.jsx";
import CardPageVisits from "../../components/Cards/CardPageVisits.jsx";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.jsx";
import CardTable from "../../components/Cards/CardTable.jsx";
import ModalPostDetail from "../../components/Modal/ModalPostDetail";

//func
import {
  setShowModalInputNote,
  setShowModalPostDetail,
} from "../../redux/slice/modalSlice.js";
import {
  deletePostPending,
  setPostDetail,
} from "../../redux/slice/postSlice.js";
import { setLoading } from "../../redux/slice/loadingSlice.js";

// layout for page
import Admin from "../../layouts/Admin.jsx";
import Modal from "../../components/Modal/index.jsx";
import ErrorMessage from "../../components/ErrorMessage/index.jsx";
import Spinner from "../../components/Spinner/index.jsx";
import { changeStatusPost } from "../../services/postService.js";
import Paginationtable from "../../components/PaginationTable/index.jsx";

const thead = [
  {
    id: 1,
    name: "Tiêu đề bài viết",
  },
  {
    id: 2,
    name: "Ảnh bài viết",
  },
  {
    id: 3,
    name: "Trạng thái",
  },
  {
    id: 4,
    name: "Tác giả",
  },
];

export default function Dashboard() {
  const loading = useSelector((state) => state.loading.loading);
  const showModalInputNote = useSelector(
    (state) => state.modal.showModalInputNote
  );
  const allPostPending = useSelector((state) => state.post.allPostPending);
  const postDetail = useSelector((state) => state.post.postDetail);
  const showModalPostDetail = useSelector(
    (state) => state.modal.showModalPostDetail
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("all pest: ", allCrops);

  const itemPerPage = 5;
  const totalPage = Math.ceil(allPostPending?.length / itemPerPage);
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;

  const schema = yup.object().shape({
    note: yup.string().required("Trường này không được để trống!"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // console.log("showModalPostDetail: ", showModalPostDetail);

  const handleShowPostDetail = (info) => {
    dispatch(setShowModalPostDetail(true));
    dispatch(setPostDetail(info));
  };

  const handleCloseModalInputNote = () => {
    dispatch(setShowModalInputNote(false));
    dispatch(setShowModalPostDetail(true));
  };

  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrePage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleDenyPost = async (id, note) => {
    try {
      dispatch(setLoading(true));
      const info = {
        status: "Từ chối",
        note: note,
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
      dispatch(setShowModalInputNote(false));
      dispatch(setShowModalPostDetail(false));
      reset({ note: "" });
    } catch (error) {
      dispatch(setLoading(false));
      enqueueSnackbar("Lỗi duyệt bài viết", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleSubmitForm = async (data) => {
    try {
      handleDenyPost(postDetail._id, data.note);
    } catch (error) {}
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        {/* <div className="w-full  mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div> */}
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
        <div className="w-full  px-4">
          <CardTable name="Bài viết chờ duyệt" thead={thead}>
            {allPostPending &&
              allPostPending?.slice(firstIndex, lastIndex).map((item) => {
                const post = item?.post;
                return (
                  <tr key={item?.post?._id}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item?.post?.tieude}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <img
                        src={item?.post?.anh}
                        className="h-12 w-12 bg-white rounded-full border object-cover"
                        alt="..."
                      />{" "}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                      {item?.post?.trangthai}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item?.user?.hoten}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <button
                        className="px-3 py-2 border border-indigo-500 text-indigo-500 rounded-lg duration-300 hover:text-white hover:bg-indigo-500"
                        onClick={() => handleShowPostDetail(post)}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })}
          </CardTable>
          {allPostPending.length > 0 && allPostPending && (
            <Paginationtable
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              total={allPostPending?.length}
              handleNextPage={handleNextPage}
              handlePrePage={handlePrePage}
              totalPage={totalPage}
              currentPage={currentPage}
            />
          )}
        </div>
        {showModalPostDetail && postDetail && (
          <ModalPostDetail post={postDetail} />
        )}
        {showModalInputNote && (
          <Modal title="Ghi chú" handleClose={handleCloseModalInputNote}>
            <form autoComplete="off" onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="form-group">
                <h3 className="form-label text-white">
                  Lý do từ chối bài viết
                </h3>
                <textarea
                  className="form-input"
                  cols="30"
                  rows="10"
                  {...register("note")}
                ></textarea>
                {errors?.note && <ErrorMessage mess={errors?.note?.message} />}
              </div>
              <button className="btn-submit bg-sky-400" type="submit">
                {loading ? <Spinner /> : "Gửi"}
              </button>
            </form>
          </Modal>
        )}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
