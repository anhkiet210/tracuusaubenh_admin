import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import ErrorMessage from "../ErrorMessage";

// components
import Spinner from "../Spinner";

export default function CardAccount() {
  const user = useSelector((state) => state.auth.currentUser);
  console.log("user: ", user);
  const [imgView, setImgView] = useState("");

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    name: yup.string().required("Hãy nhập tên của loại cây!"),
    img: yup
      .mixed()
      .test(
        "required",
        "Hãy chọn ảnh cho loại cây trồng này!",
        (value) => value && value.length
      ),
  });

  const infoUser = {
    name: user?.hoten,
    email: user?.email,
    phone: user?.sdt,
  };

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: infoUser,
  });

  const imgTest = watch("img");

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

  useEffect(() => {
    if (imgTest && imgTest.length > 0) {
      handleConvertBase64(imgTest[0]);
    }
  }, [watch("img")]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">
              Tài khoản của tôi
            </h6>
            {/* <button
              className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Settings
            </button> */}
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
              Thông tin tài khoản
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
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
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    // defaultValue="anhkietk053@gmail.com"
                    disabled
                    {...register("email")}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    // defaultValue="0365480118"
                    {...register("phone")}
                  />
                  {errors?.phone && (
                    <ErrorMessage mess={errors?.phone?.message} />
                  )}
                </div>
              </div>
              <div className="w-full px-4 ">
                <div className="form-group w-full lg:w-6/12">
                  <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                    Hãy chọn ảnh cho loại cây trồng này
                  </label>
                  <div className="flex items-center justify-center w-full gap-4 duration-200">
                    {!watch("img") || watch("img").length === 0 ? (
                      <label className="flex flex-col w-1/2 h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 animate-toLeft-hand">
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
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Click vào đây để thêm ảnh
                          </p>
                        </div>
                        <input
                          type="file"
                          className="opacity-0 hidden"
                          {...register("img")}
                          accept=".jpg, .png, .jpeg"
                        />
                        {errors?.img && (
                          <ErrorMessage mess={errors?.img?.message} />
                        )}
                      </label>
                    ) : (
                      <div className="w-1/2 animate-toLeft-hand">
                        <img
                          src={imgView || user.anhdaidien}
                          alt=""
                          className="w-full object-contain"
                        />
                        <button
                          className="btn-submit w-full bg-sky-500 mt-3"
                          onClick={handleSelectAgain}
                        >
                          Chọn lại
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-slate-300" />
            <div className="">
              <button className="btn-submit bg-sky-500 mt-3">Lưu</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
