import React, { useRef } from "react";
import { login } from "../../services/authService";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { setToken } from "../../utils/jwt";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";

// layout for page

export default function Login() {
  const router = useRouter();
  const loadingLogin = useRef(false);
  const { enqueueSnackbar } = useSnackbar();
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Hãy nhập đúng định dạng email!")
      .required("Hãy nhập email!"),
    password: yup
      .string()
      .required("Hãy nhập mật khẩu!")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự!"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmitForm = async (data) => {
    try {
      loadingLogin.current = true;
      const info = {
        email: data.email,
        password: data.password,
      };
      const res = await login(info);
      if (res?.success) {
        setToken(res.accessToken);
        localStorage.setItem("Token", res?.accessToken);
        router.push("/admin/dashboard");
        enqueueSnackbar(res.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
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

      if (res?.response?.status === 401) {
        enqueueSnackbar(res?.response.data.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
      loadingLogin.current = false;
      // console.log("res login", res);
    } catch (error) {
      console.log(error);
      loadingLogin.current = false;
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10">
                <form
                  onSubmit={handleSubmit(handleSubmitForm)}
                  autoComplete="off"
                >
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Hãy nhập email!",
                      })}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                    {errors?.email && (
                      <ErrorMessage mess={errors?.email?.message} />
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mật khẩu
                    </label>
                    <input
                      {...register("password")}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Mật khẩu"
                    />
                    {errors?.password && (
                      <ErrorMessage mess={errors?.password?.message} />
                    )}
                  </div>
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-slate-600">
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className="text-center mt-6">
                    <button
                      className={`bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 flex items-center justify-center ${
                        loadingLogin.current ? "disabled:opacity-75" : ""
                      }`}
                      type="submit"
                    >
                      {loadingLogin.current ? <Spinner /> : "Đăng nhập"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-slate-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              {/* <div className="w-1/2 text-right">
                  <Link href="/auth/register">
                    <a href="#pablo" className="text-slate-200">
                      <small>Create new account</small>
                    </a>
                  </Link>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
