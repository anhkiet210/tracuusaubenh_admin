import React from "react";

// components

import CardTable from "../../components/Cards/CardTable.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";

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
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable showBtnAdd={"Thêm loại cây trồng"} thead={thead}>
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
      </div>
    </>
  );
}

Crops.layout = Admin;
