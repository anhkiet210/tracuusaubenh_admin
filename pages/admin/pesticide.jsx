import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";

//func
import { setLoading } from "../../redux/slice/loadingSlice.js";
import { createPesticide } from "../../services/pesticideService.js";

// components
import CardTable from "../../components/Cards/CardTable.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";
import Modal from "../../components/Modal/index.jsx";

// layout for page
import Admin from "../../layouts/Admin.jsx";
import ErrorMessage from "../../components/ErrorMessage/index.jsx";
import Spinner from "../../components/Spinner/index.jsx";
import { addPesticide } from "../../redux/slice/pesticideSlice.js";
import { setShow } from "../../redux/slice/modalSlice.js";

const thead = [
  {
    id: 1,
    name: "Tên thuốc",
  },
  {
    id: 2,
    name: "Ảnh",
  },
  {
    id: 3,
    name: "Trị bệnh",
  },
  {
    id: 4,
    name: "Công dụng",
  },
];

export default function Pesticide() {
  const allPesticides = useSelector((state) => state.pesticide.allPesticides);
  const allPests = useSelector((state) => state.pest.allPests);
  const loading = useSelector((state) => state.loading.loading);
  const show = useSelector((state) => state.modal.show);
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [imgView, setImgView] = useState("");
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    pesticideName: yup.string().required("Hãy nhập tên thuốc"),
    uses: yup.string().required("Hãy nhập công dụng của thuốc"),
    img: yup
      .mixed()
      .test(
        "required",
        "Hãy chọn ảnh cho loại thuốc này",
        (value) => value && value.length
      ),
    listPest: yup
      .array()
      .min(1, "Phải chọn ít nhất một loại bệnh")
      .of(yup.string().required())
      .required("Hãy chọn bệnh"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const handShowModal = () => dispatch(setShow(true));
  const handCloseModal = () => dispatch(setShow(false));

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

  const handleSubmitForm = async (data) => {
    try {
      // console.log("data: ", data);
      let test = data.listPest;
      test = test.map((item) => JSON.parse(item));
      // console.log("type: ", test);

      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("pesticideName", data.pesticideName);
      formData.append("uses", data.uses);
      formData.append("file", data.img[0]);
      test.forEach((element) => {
        formData.append("pests", JSON.stringify(element));
      });
      const res = await createPesticide(formData);
      console.log("res: ", res);
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
      dispatch(addPesticide(res?.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  // console.log(watch("listPest"));
  console.log("all pest: ", allPesticides?.Benhs);

  return (
    <>
      <div className="flex flex-wrap mt-4 min-h-full">
        <div className="w-full mb-12 px-4">
          <CardTable
            thead={thead}
            showBtnAdd="Thêm thuốc"
            action={handShowModal}
            name="Danh sách thuốc đặc trị"
          >
            {allPesticides.length > 0 &&
              allPesticides?.map((item) => (
                <tr key={item._id}>
                  <td className="border-t-0 p-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                    {item?.tenthuoc}
                  </td>
                  <td className="border-t-0 p-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap min-w-24">
                    <img
                      src={item?.anh}
                      className="h-12 w-12 bg-white rounded-full border object-cover"
                      alt="..."
                    ></img>{" "}
                  </td>
                  <td className="border-t-0 p-4 align-middle border-l-0 border-r-0 text-xs">
                    <div className="max-w-sm flex gap-2 flex-wrap">
                      {item?.Benhs?.length > 0 &&
                        item?.Benhs.map((benh) => (
                          <span
                            className="bg-slate-300 text-slate-800 rounded-lg p-2"
                            key={benh?._id}
                          >
                            {benh?.ten}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td className="border-t-0 p-4 align-middle border-l-0 border-r-0 text-xs max-w-xs">
                    {item?.congdung} 
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown />
                  </td>
                </tr>
              ))}
          </CardTable>
        </div>
        {show && (
          <Modal title="Thêm thuốc trị" handleClose={handCloseModal}>
            <div className="">
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="form-group">
                  <label className="form-label" htmlFor="grid-password">
                    Tên thuốc
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Nhập tên bệnh..."
                    {...register("pesticideName")}
                  />
                  {errors?.pesticideName && (
                    <ErrorMessage mess={errors?.pesticideName?.message} />
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Hãy chọn ảnh cho loại thuốc này
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
                  <label className="form-label">Công dụng của thuốc</label>
                  <textarea
                    {...register("uses")}
                    id=""
                    cols="30"
                    rows="10"
                    className="form-input"
                  ></textarea>
                  {errors?.uses && (
                    <ErrorMessage mess={errors?.uses?.message} />
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Bệnh</label>
                  <div className="flex flex-wrap gap-2 ">
                    {allPests &&
                      allPests.length > 0 &&
                      allPests.map((item) => (
                        <div className="">
                          <input
                            type="checkbox"
                            {...register("listPest")}
                            id={item?.pest?._id}
                            className="hidden peer"
                            required=""
                            value={JSON.stringify({
                              idBenh: item?.pest?._id,
                              ten: item?.pest?.ten,
                            })}
                          />
                          <label
                            className="p-2 bg-slate-200 inline-block text-slate-800 rounded-lg cursor-pointer select-none peer-checked:bg-slate-400 peer-checked:text-white"
                            htmlFor={item?.pest?._id}
                          >
                            {item?.pest?.ten}
                          </label>
                        </div>
                      ))}
                  </div>
                  {errors?.listPest && (
                    <ErrorMessage mess={errors?.listPest?.message} />
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-submit bg-sky-500 mt-3 btn-disabled"
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

Pesticide.layout = Admin;
