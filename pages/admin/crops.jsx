import React, { useState } from "react";

// components

import CardTable from "../../components/Cards/CardTable.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";
import Modal from "../../components/Modal/index.jsx";

// layout for page

import Admin from "../../layouts/Admin.jsx";

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
  const [showModal, setShowModal] = useState(true);
  const handShowModal = () => setShowModal(true);
  const handCloseModal = () => setShowModal(false);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable
            showBtnAdd={"Thêm loại cây trồng"}
            thead={thead}
            action={handShowModal}
          >
            <tr>
              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <span
                // className={
                //   "ml-3 font-bold " +
                //   +(color === "light" ? "text-slate-600" : "text-white")
                // }
                >
                  Argon Design System
                </span>
              </th>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <img
                  src="/img/bootstrap.jpg"
                  className="h-12 w-12 bg-white rounded-full border"
                  alt="..."
                ></img>{" "}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                $2,500 USD
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                <TableDropdown />
              </td>
            </tr>
          </CardTable>
        </div>
        {showModal && (
          <Modal title="Thêm loại cây" handleClose={handCloseModal}>
            <div className="">
              <form action="">
                <div className="form-group">
                  <label className="form-label">Tên loại cây</label>
                  <input type="text" className="form-input" />
                </div>
                <div class="form-group">
                  <label class="form-label">
                    Hãy chọn ảnh cho loại cây trồng này
                  </label>
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

Crops.layout = Admin;
