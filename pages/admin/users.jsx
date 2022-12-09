import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

//func
import { setLoading } from "../../redux/slice/loadingSlice.js";
import { deleteUserRedux } from "../../redux/slice/authSlice";
import { deleteUser } from "../../services/userService.js";

// components
import CardTable from "../../components/Cards/CardTable.jsx";
import Paginationtable from "../../components/PaginationTable/index.jsx";

// layout for page
import Admin from "../../layouts/Admin.jsx";

const thead = [
  {
    id: 1,
    name: "Họ tên",
  },
  {
    id: 2,
    name: "Email",
  },
  {
    id: 3,
    name: "Số điện thoại",
  },
  {
    id: 4,
    name: "Ảnh đại diện",
  },
];

export default function Tables() {
  const allUsers = useSelector((state) => state.auth.allUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const itemPerPage = 5;
  const totalPage = Math.ceil(allUsers?.length / itemPerPage);
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;

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

  const handleDeleteUser = async (id) => {
    try {
      if (typeof window !== undefined) {
        const result = window.confirm("Bạn có muốn xóa người dùng này không?");
        if (result) {
          // console.log("id: ", id);
          dispatch(setLoading(true));
          const res = await deleteUser(id);
          // console.log("delete user: ", res);
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
            enqueueSnackbar(res?.response.data.message, {
              variant: "error",
              autoHideDuration: 2000,
            });
            dispatch(setLoading(false));
            return;
          }
          dispatch(deleteUserRedux(id));
          enqueueSnackbar(res?.message, {
            variant: "success",
            autoHideDuration: 2000,
          });
          dispatch(setLoading(false));
        }
      }
    } catch (error) {
      dispatch(setLoading(false));
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable thead={thead} name="Danh sách người dùng">
            {allUsers?.map((user) => (
              <tr key={user._id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                  {user?.hoten}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                  {user?.email}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                  {user?.sdt}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                  <img
                    src={user?.anhdaidien}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 text-right">
                  <button
                    className="px-3 py-2 border border-red-600 text-red-600 rounded-lg duration-300 hover:text-white hover:bg-red-600"
                    onClick={() => handleDeleteUser(user?._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </CardTable>
          <Paginationtable
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            total={allUsers?.length}
            handleNextPage={handleNextPage}
            handlePrePage={handlePrePage}
            totalPage={totalPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
