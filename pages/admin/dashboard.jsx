import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

// components
import CardLineChart from "../../components/Cards/CardLineChart.jsx";
import CardBarChart from "../../components/Cards/CardBarChart.jsx";
import CardPageVisits from "../../components/Cards/CardPageVisits.jsx";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.jsx";
import CardTable from "../../components/Cards/CardTable.jsx";
import ModalPostDetail from "../../components/Modal/ModalPostDetail";

//func
import { setShowModalPostDetail } from "../../redux/slice/modalSlice.js";
import { setPostDetail } from "../../redux/slice/postSlice.js";

// layout for page
import Admin from "../../layouts/Admin.jsx";

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
  const allPostPending = useSelector((state) => state.post.allPostPending);
  const postDetail = useSelector((state) => state.post.postDetail);
  const showModalPostDetail = useSelector(
    (state) => state.modal.showModalPostDetail
  );
  console.log("showModalPostDetail: ", showModalPostDetail);
  const dispatch = useDispatch();

  const handleShowPostDetail = (info) => {
    dispatch(setShowModalPostDetail(true));
    dispatch(setPostDetail(info));
    // console.log("info: ", info);
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
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
        <div className="w-full  px-4">
          <CardTable name="Bài viết chờ duyệt" thead={thead}>
            {allPostPending &&
              allPostPending.map((item) => {
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
        </div>
        {/* <ModalPostDetail /> */}
        {showModalPostDetail && postDetail && (
          <ModalPostDetail post={postDetail} />
        )}
      </div>
    </>
  );
}

Dashboard.layout = Admin;
