import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import {
  setInfoCurrentUser,
  setInfoAllUsers,
} from "../redux/slice/authSlice.js";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import HeaderStats from "../components/Headers/HeaderStats.jsx";
import FooterAdmin from "../components/Footers/FooterAdmin.jsx";
import { getInfo } from "../services/authService.js";
import { getAllUser } from "../services/userService.js";
import { getAllPests } from "../services/pestService.js";
import { setAllPests } from "../redux/slice/pestSlice.js";

export default function Admin({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState({});
  const getCurrentUser = async () => {
    try {
      const res = await getInfo();
      if (res?.response?.status === 404) {
        enqueueSnackbar("Bạn chưa đăng nhập!", {
          variant: "error",
          autoHideDuration: 2000,
        });
        // router.push("/")
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

      if (res?.success) {
        dispatch(setInfoCurrentUser(res?.user));
      }
      // console.log("info user", res);
    } catch (error) {
      console.log(error);
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
        dispatch(setAllPests(res?.pests));
      }
      console.log("all pests: ", res);
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("Token")) {
        router.push("/");
        enqueueSnackbar("Bạn cần đăng nhập!", {
          variant: "error",
          autoHideDuration: 2000,
        });
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
      </div>
    </>
  );
}
