import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

//func
import { createPest } from "../../services/pestService";

// components
import CardTable from "../../components/Cards/CardTable.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";
import Modal from "../../components/Modal/index.jsx";
import ErrorMessage from "../../components/ErrorMessage/index.jsx";
import Paginationtable from "../../components/PaginationTable/index.jsx";

// layout for page
import Admin from "../../layouts/Admin.jsx";
import { setLoading } from "../../redux/slice/loadingSlice";
import { addPest } from "../../redux/slice/pestSlice";
import Spinner from "../../components/Spinner";

const thead = [
  {
    id: 1,
    name: "Tên bệnh",
  },
  {
    id: 2,
    name: "Ảnh",
  },
  {
    id: 3,
    name: "Loại cây",
  },
  {
    id: 4,
    name: "Triệu chứng",
  },
];

export default function Pests() {
  const allPests = useSelector((state) => state.pest.allPests);
  const allCrops = useSelector((state) => state.crop.allCrops);
  const loading = useSelector((state) => state.loading.loading);
  const [showModal, setShowModal] = useState(false);
  const [imgView, setImgView] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("all pest: ", allCrops);

  const itemPerPage = 5;
  const totalPage = Math.ceil(allPests?.length / itemPerPage);
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;

  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    name: yup.string().required("Hãy nhập tên bệnh!"),
    img: yup
      .mixed()
      .test(
        "required",
        "Hãy chọn ảnh cho loại bệnh này!",
        (value) => value && value.length
      ),
    idCrop: yup.string().required("Hãy chọn loại cây!"),
    detailedSymptoms: yup
      .string()
      .required("Hãy nhập triệu chứng chi tiết cho bệnh"),
  });

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

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

  const handShowModal = () => setShowModal(true);
  const handCloseModal = () => {
    setShowModal(false);
    reset({
      name: "",
      img: "",
      detailedSymptoms: "",
      idCrop: "",
      la: "",
      than: "",
      re: "",
    });
  };

  const handleSubmitForm = async (data) => {
    try {
      dispatch(setLoading(true));
      if (!data.la && !data.than && !data.re) {
        enqueueSnackbar("Hãy nhập ít nhất một triệu chứng nhận dạng.", {
          variant: "warning",
          autoHideDuration: 3000,
        });
        dispatch(setLoading(false));
        return;
      }

      const info = JSON.stringify({
        la: data.la || "",
        than: data.than || "",
        re: data.re || "",
      });

      console.log("info: ", info);
      const formData = new FormData();
      formData.append("pestName", data.name);
      formData.append("detailedSymptoms", data.detailedSymptoms);
      formData.append("file", data.img[0]);
      formData.append("idCrop", data.idCrop);
      formData.append("la", data.la);
      formData.append("than", data.than);
      formData.append("re", data.re);

      const res = await createPest(formData);

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
      dispatch(addPest(res?.data));
      // console.log("submit form: ", res);
      dispatch(setLoading(false));
      handCloseModal();
      enqueueSnackbar("Thêm thông tin sâu bệnh thành công.", {
        variant: "success",
        autoHideDuration: 2000,
      });
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
      <div className="flex flex-wrap mt-4 min-h-full">
        <div className="w-full mb-12 px-4">
          <CardTable
            thead={thead}
            showBtnAdd="Thêm bệnh"
            name="Danh sách sâu bệnh"
            action={handShowModal}
          >
            {allPests.length > 0 &&
              allPests?.map((item) => (
                <tr key={item.pest._id}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item?.pest.ten}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <img
                      src={item?.pest.anh}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item?.crop.tenloai}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 max-w-xs">
                    {item?.pest.trieuchungchitiet}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown />
                  </td>
                </tr>
              ))}
          </CardTable>
          {allPests.length > 0 && allPests && (
            <Paginationtable
              firstIndex={firstIndex}
              lastIndex={lastIndex}
              total={allPests?.length}
              handleNextPage={handleNextPage}
              handlePrePage={handlePrePage}
              totalPage={totalPage}
              currentPage={currentPage}
            />
          )}
        </div>
        {showModal && (
          <Modal title="Thêm Bệnh" handleClose={handCloseModal}>
            <div className="">
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="form-group">
                  <label className="form-label" htmlFor="grid-password">
                    Tên bệnh
                  </label>
                  <input
                    {...register("name", {
                      required: "Hãy nhập tên bệnh!",
                    })}
                    type="text"
                    className="form-input"
                    placeholder="Nhập tên bệnh..."
                  />
                  {errors?.name && (
                    <ErrorMessage mess={errors?.name?.message} />
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Hãy chọn ảnh cho loại bệnh này
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
                          // onChange={(event) => handleImgChange(event)}
                          accept=".jpg, .png, .jpeg"
                        />
                        {errors?.img && (
                          <ErrorMessage mess={errors?.img?.message} />
                        )}
                      </label>
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
                  <label className="form-label">Triệu chứng nhận dạng</label>
                  <div className="form-group pl-5">
                    <label className="form-label">Lá</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Triệu chứng nhận dạng ở lá..."
                      {...register("la")}
                    />
                  </div>
                  <div className="form-group pl-5">
                    <label className="form-label">Thân</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Triệu chứng nhận dạng ở thân..."
                      {...register("than")}
                    />
                  </div>
                  <div className="form-group pl-5">
                    <label className="form-label">Rễ</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Triệu chứng nhận dạng ở rễ..."
                      {...register("re")}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Triệu chứng chi tiết</label>
                  <textarea
                    id=""
                    cols="30"
                    rows="10"
                    className="form-input"
                    {...register("detailedSymptoms")}
                  ></textarea>
                  {errors?.detailedSymptoms && (
                    <ErrorMessage mess={errors?.detailedSymptoms?.message} />
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Thuộc loại cây</label>
                  <select className="form-input" {...register("idCrop")}>
                    <option value="">Hãy chọn loại cây...</option>
                    {allCrops &&
                      allCrops.map((item) => (
                        <option value={item?._id} key={item?._id}>
                          {item.tenloai}
                        </option>
                      ))}
                  </select>
                  {errors?.idCrop && (
                    <ErrorMessage mess={errors?.idCrop?.message} />
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-submit bg-sky-500 mt-3 felx items-center justify-center btn-disabled"
                  disabled={loading}
                >
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

Pests.layout = Admin;
