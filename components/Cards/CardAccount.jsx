import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

//func
import { setLoading } from "../../redux/slice/loadingSlice";
import { UpdateInfo } from "../../services/authService";
import { setInfoCurrentUser } from "../../redux/slice/authSlice";

// components
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import CardChangePassword from "./CardChangePassword";

export default function CardAccount() {
  const user = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.loading.loading);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    name: yup.string().required("Hãy nhập họ tên!"),
    phone: yup
      .string()
      .required("Hãy nhập số điện thoại")
      .matches("[0-9]{3}[0-9]", "Hãy nhập đúng định dạng số điện thoại!")
      .length(10, "Số điện thoại phải đủ 10 số!"),
  });

  const {
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.hoten,
      phone: user?.sdt,
    },
  });

  const name = watch("name");
  const phone = watch("phone");

  useEffect(() => {
    setValue("name", user?.hoten);
    setValue("phone", user?.sdt);
  }, [user]);

  const handleChangeInfo = async (data) => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("phone", data.phone.trim());
      const res = await UpdateInfo(formData);
      // console.log("res: ", res);
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
      dispatch(setInfoCurrentUser(res?.data));
      enqueueSnackbar(res?.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
      dispatch(setLoading(false));
      setDisabled(true);
    } catch (error) {
      dispatch(setLoading(false));
      enqueueSnackbar("Lỗi cập nhật thông tin!", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    if (name === user?.hoten && phone === user?.sdt) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, phone]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">
              Tài khoản của tôi
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form onSubmit={handleSubmit(handleChangeInfo)} autoComplete="off">
            <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
              Thông tin tài khoản
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 md:px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                    Họ tên
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                  {errors?.name && (
                    <ErrorMessage mess={errors?.name?.message} />
                  )}
                </div>
              </div>
              <div className="w-full lg:w-6/12 md:px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    disabled
                    defaultValue={user?.email}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 md:px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    {...register("phone")}
                  />
                  {errors?.phone && (
                    <ErrorMessage mess={errors?.phone?.message} />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-submit bg-sky-500 mt-3 btn-disabled"
              disabled={disabled || loading}
            >
              {loading ? <Spinner /> : "Lưu"}
            </button>
          </form>
        </div>
        <hr className="mt-6 border-b-1 border-slate-300" />
        <CardChangePassword />
      </div>
    </>
  );
}
