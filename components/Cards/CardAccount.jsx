import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

//func
import { setLoading } from "../../redux/slice/loadingSlice";

// components
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import CardChangePassword from "./CardChangePassword";

export default function CardAccount() {
  const user = useSelector((state) => state.auth.currentUser);
  const loading = useSelector((state) => state.loading.loading);
  const setLoadingDeny = useSelector((state) => state.loading.setLoadingDeny);
  // console.log("user: ", user);
  const [imgView, setImgView] = useState("");
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    name: yup.string().required("Hãy nhập họ tên!"),
    img: yup
      .mixed()
      .test(
        "required",
        "Hãy chọn ảnh đại diện!",
        (value) => value && value.length
      ),
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
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email,
      name: user?.hoten,
      phone: user?.sdt,
    },
  });

  const imgTest = watch("img");
  const name = watch("name");
  const phone = watch("phone");

  const handleConvertBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImgView(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  const handleSelectAgain = () => {
    reset({ img: "" });
  };

  const handleChangeInfo = async (data) => {
    try {
      // dispatch(setLoading(true));
      console.log("data: ", data);
    } catch (error) {
      enqueueSnackbar("Lỗi cập nhật thông tin!", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    if (imgTest && imgTest.length > 0) {
      handleConvertBase64(imgTest[0]);
    }
  }, [watch("img")]);

  useEffect(() => {
    if (name === user?.hoten && phone === user?.sdt && imgTest?.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [name, phone, imgTest]);

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
          <form onSubmit={handleSubmit(handleChangeInfo)}>
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
                    defaultValue={user?.hoten}
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
                    {...register("email")}
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
                    defaultValue={user?.sdt}
                    {...register("phone")}
                  />
                  {errors?.phone && (
                    <ErrorMessage mess={errors?.phone?.message} />
                  )}
                </div>
              </div>

              <div className="w-full md:px-4">
                <div className="form-group w-full lg:w-6/12">
                  <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                    Ảnh đại diện
                  </label>
                  <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 duration-200">
                    <label className="flex flex-col w-full md:w-1/2 h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 animate-toLeft-hand">
                      <div className="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="pt-1 text-sm text-center tracking-wider text-gray-400 group-hover:text-gray-600">
                          Click vào đây để thêm ảnh
                        </p>
                      </div>
                      <input
                        type="file"
                        className="opacity-0 hidden"
                        {...register("img")}
                        accept=".jpg, .png, .jpeg"
                      />
                      {/* {errors?.img && <ErrorMessage mess={errors?.img?.message} />} */}
                    </label>
                    <div className="w-full md:w-1/3 animate-toLeft-hand">
                      <img
                        src={imgView || user?.anhdaidien}
                        alt=""
                        className="w-full object-contain rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn-submit bg-sky-500 mt-3 btn-disabled"
              disabled={disabled || loading}
            >
              Lưu
            </button>
          </form>
        </div>
        <hr className="mt-6 border-b-1 border-slate-300" />
        <CardChangePassword />
      </div>
    </>
  );
}
