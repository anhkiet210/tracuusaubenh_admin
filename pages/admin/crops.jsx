import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

//func
import { addCrops } from "../../redux/slice/cropSlice";
import { setLoading } from "../../redux/slice/loadingSlice";

// components
import CardTable from "../../components/Cards/CardTable.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";
import Modal from "../../components/Modal/index.jsx";
import Spinner from "../../components/Spinner";

// layout for page
import ErrorMessage from "../../components/ErrorMessage/index.jsx";
import Paginationtable from "../../components/PaginationTable";
import Admin from "../../layouts/Admin.jsx";
import { createCrop } from "../../services/cropService.js";

const thead = [
  {
    id: 1,
    name: "Tên loại cây",
  },
  {
    id: 2,
    name: "Ảnh",
  },
  {
    id: 3,
    name: "Mô tả ngắn",
  },
];

export default function Crops() {
  const crops = useSelector((state) => state.crop.allCrops);
  const loading = useSelector((state) => state.loading.loading);
  // console.log("crops: ", crops);
  const [showModal, setShowModal] = useState(false);
  const [imgView, setImgView] = useState("");
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const itemPerPage = 5;
  const totalPage = Math.ceil(crops?.length / itemPerPage);
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;

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
  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const handShowModal = () => setShowModal(true);

  const handCloseModal = () => {
    setShowModal(false);
    reset({ name: "", img: "", shortDes: "" });
  };

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

  useEffect(() => {
    if (imgTest && imgTest.length > 0) {
      handleConvertBase64(imgTest[0]);
    }
  }, [watch("img")]);

  const handleSubmitForm = async (data) => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("cropName", data.name);
      formData.append("file", data.img[0]);
      formData.append("shortDes", data.shortDes);
      const res = await createCrop(formData);
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
      dispatch(addCrops(res?.data));
      enqueueSnackbar(res?.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
      // loading.current = false;
      dispatch(setLoading(false));
      handCloseModal();
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
          <CardTable
            showBtnAdd={"Thêm loại cây trồng"}
            thead={thead}
            action={handShowModal}
            name="Danh sách các loại cây trồng"
          >
            {crops &&
              crops.slice(firstIndex, lastIndex).map((item, index) => (
                <tr
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-slate-100"
                  } hover:bg-slate-300 trasition duration-300`}
                >
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap max-w-md py-2">
                    {item?.tenloai}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap min-w-12 py-2">
                    <img
                      src={item?.anh}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap max-w-lg py-2">
                    {item?.mota}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2 text-right">
                    <TableDropdown />
                  </td>
                </tr>
              ))}
          </CardTable>
          <Paginationtable
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            total={crops?.length}
            handleNextPage={handleNextPage}
            handlePrePage={handlePrePage}
            totalPage={totalPage}
            currentPage={currentPage}
          />
        </div>
        {showModal && (
          <Modal title="Thêm loại cây" handleClose={handCloseModal}>
            <div className="">
              <form
                onSubmit={handleSubmit(handleSubmitForm)}
                autoComplete="off"
              >
                <div className="form-group">
                  <label className="form-label">Tên loại cây</label>
                  <input
                    type="text"
                    className="form-input"
                    {...register("name")}
                  />
                  {errors?.name && (
                    <ErrorMessage mess={errors?.name?.message} />
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Hãy chọn ảnh cho loại cây trồng này
                  </label>
                  <div className="flex items-center flex-col justify-center w-full gap-4 duration-200">
                    {!watch("img") || watch("img").length === 0 ? (
                      <>
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
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 text-center">
                              Click vào đây để thêm ảnh
                            </p>
                          </div>
                          <input
                            type="file"
                            className="opacity-0 hidden"
                            {...register("img")}
                            // onChange={(event) => handleImgChange(event)}
                            accept=".jpg, .png, .jpeg"
                          />
                        </label>
                        {errors?.img && (
                          <ErrorMessage mess={errors?.img?.message} />
                        )}
                      </>
                    ) : (
                      <div className="w-1/2 animate-toLeft-hand">
                        <img
                          src={imgView}
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
                <div className="form-group">
                  <label className="form-label">Mô tả</label>
                  <textarea
                    cols="30"
                    rows="5"
                    className="form-input"
                    {...register("shortDes")}
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit bg-sky-500 mt-3">
                  {loading ? <Spinner /> : "Thêm"}
                </button>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

Crops.layout = Admin;
