import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";

//func
import {
  setInfoCurrentUser,
  setInfoAllUsers,
} from "../redux/slice/authSlice.js";
import { setAllPests } from "../redux/slice/pestSlice.js";
import { setAllPostPending } from "../redux/slice/postSlice";
import { setAllCrops } from "../redux/slice/cropSlice.js";
import { getAllCrops } from "../services/cropService.js";
import { getAllPostPending } from "../services/postService.js";
import { getInfo } from "../services/authService.js";
import { getAllUser } from "../services/userService.js";
import { getAllPests } from "../services/pestService.js";
import { getAllPesticides } from "../services/pesticideService.js";
import { setAllPesticide } from "../redux/slice/pesticideSlice.js";
import { setAllStatistical } from "../redux/slice/statisticalSlice.js";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import HeaderStats from "../components/Headers/HeaderStats.jsx";
import FooterAdmin from "../components/Footers/FooterAdmin.jsx";
import FormChangeAvatar from "../components/Modal/ModalChangeAvatar/index.jsx";
import { getAllStatistical } from "../services/statisticalService.js";

export default function Admin({ children }) {
  const tokenRedux = useSelector((state) => state.auth.tokenRedux);
  const showFormChangeAvatar = useSelector(
    (state) => state.modal.showFormChangeAvatar
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const getCurrentUser = async () => {
    try {
      const res = await getInfo();
      // console.log("res: ", res);
      if (res?.response?.status === 401) {
        enqueueSnackbar("Bạn chưa đăng nhập!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        localStorage.removeItem("Token");
        router.push("/");
      }
      if (res?.code === "ERR_NETWORK") {
        enqueueSnackbar("Lỗi kết nối server!", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }

      if (res?.code === "ERR_BAD_RESPONSE") {
        // enqueueSnackbar(res?.response?.data?.message, {
        //   variant: "error",
        //   autoHideDuration: 2000,
        // });
        // localStorage.removeItem("Token");
        router.push("/");
        return;
      }

      if (res?.success) {
        dispatch(setInfoCurrentUser(res?.user));
      }
    } catch (error) {
      // console.log(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const res = await getAllUser();
      if (res?.success) {
        dispatch(setInfoAllUsers(res?.users));
      }

      if (res?.code === "ERR_NETWORK") {
        enqueueSnackbar("Lỗi kết nối server!", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }

      if (res?.code === "ERR_BAD_RESPONSE") {
        enqueueSnackbar("Lỗi server!", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }

      // console.log("all user: ", res);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleGetAllPests = async () => {
    try {
      const res = await getAllPests();
      if (res?.success) {
        dispatch(setAllPests(res?.data));
      }
      // console.log("all pests: ", res);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleGetAllCrops = async () => {
    try {
      const res = await getAllCrops();
      if (res?.success) {
        dispatch(setAllCrops(res?.data));
      }
      // console.log("crops: ", res);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleGetPostPending = async () => {
    try {
      const res = await getAllPostPending();
      // console.log("ok: ", res);
      if (res?.success) {
        dispatch(setAllPostPending(res?.data));
      }

      if (res?.code === "ERR_NETWORK") {
        enqueueSnackbar("Lỗi kết nối server!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return;
      }

      if (res?.code === "ERR_BAD_RESPONSE") {
        enqueueSnackbar("Lỗi server!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return;
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleGetAllPesticides = async () => {
    try {
      const res = await getAllPesticides();
      // console.log("ok: ", res);
      if (res?.success) {
        dispatch(setAllPesticide(res?.data));
      }

      if (res?.code === "ERR_NETWORK") {
        enqueueSnackbar("Lỗi kết nối server!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return;
      }

      if (res?.code === "ERR_BAD_RESPONSE") {
        enqueueSnackbar("Lỗi server!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        return;
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleGetAllStatistical = async () => {
    try {
      const res = await getAllStatistical();
      console.log("res: ", res);
      if (res?.success) {
        dispatch(setAllStatistical(res?.data));
      }
    } catch (error) {
      enqueueSnackbar("Tải dữ liệu thống kê thất bại!", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenLocal = localStorage.getItem("Token");
      if (!tokenRedux && !tokenLocal) {
        router.push("/");
      } else {
        getCurrentUser();
      }
    }
  }, []);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    handleGetAllPests();
  }, []);

  useEffect(() => {
    handleGetAllCrops();
  }, []);

  useEffect(() => {
    handleGetPostPending();
  }, []);

  useEffect(() => {
    handleGetAllPesticides();
  }, []);

  useEffect(() => {
    handleGetAllStatistical();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-slate-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
        {showFormChangeAvatar && <FormChangeAvatar />}
      </div>
    </>
  );
}
