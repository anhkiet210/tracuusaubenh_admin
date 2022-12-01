import React, { useState } from "react";
import { useSelector } from "react-redux";

// components

import CardTable from "../../components/Cards/CardTable.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";
import Modal from "../../components/Modal/index.jsx";

// layout for page

import Admin from "../../layouts/Admin.jsx";

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

export default function Pesticide() {
  const allPesticides = useSelector((state) => state.pesticide.allPesticides);
  const allPests = useSelector((state) => state.pest.allPests);
  const [showModal, setShowModal] = useState(false);
  const handShowModal = () => setShowModal(true);
  const handCloseModal = () => setShowModal(false);
  // console.log("all pest: ", allPests);
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
        </div>
        {showModal && (
          <Modal title="Thêm Bệnh" handleClose={handCloseModal}>
            <div className="">
              <form action="">
                <div className="form-group">
                  <label className="form-label" htmlFor="grid-password">
                    Tên bệnh
                  </label>
                  <input
                    // {...register("email", {
                    //   required: "Hãy nhập email!",
                    // })}
                    type="email"
                    className="form-input"
                    placeholder="Nhập tên bệnh..."
                  />
                  {/* {errors?.email && (
                    <ErrorMessage mess={errors?.email?.message} />
                  )} */}
                </div>
                <div class="form-group">
                  <label class="form-label">Hãy chọn ảnh chọn bệnh</label>
                  <div class="flex items-center justify-center w-full gap-4">
                    <label class="flex flex-col w-1/2 h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Click vào đây để thêm ảnh
                        </p>
                      </div>
                      <input type="file" class="opacity-0 hidden" />
                    </label>
                    <div className="w-1/2">
                      <img
                        src="https://res.cloudinary.com/ak-tracuusaubenh/image/upload/v1665496207/1_yzejbp.jpg"
                        alt=""
                        className="w-full object-contain"
                      />
                    </div>
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
                    />
                  </div>
                  <div className="form-group pl-5">
                    <label className="form-label">Thân</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Triệu chứng nhận dạng ở thân..."
                    />
                  </div>
                  <div className="form-group pl-5">
                    <label className="form-label">Rễ</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Triệu chứng nhận dạng ở rễ..."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Triệu chứng chi tiết</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="form-input"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Thuộc loại cây</label>
                  <select className="form-input">
                    <option value="">ok</option>
                    <option value="">ok</option>
                    <option value="">ok</option>
                  </select>
                </div>
                <button type="submit" className="btn-submit bg-sky-500 mt-3">
                  Thêm
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
