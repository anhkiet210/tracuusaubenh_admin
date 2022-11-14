import React from "react";

// components

import CardTable from "../../components/Cards/CardTable.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";

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

export default function Pests() {
  return (
    <>
      <div className="flex flex-wrap mt-4 min-h-full">
        <div className="w-full mb-12 px-4">
          <CardTable thead={thead}>
            <tr>
              <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <span
                // className={
                //   "ml-3 font-bold " +
                //   +(color === "light" ? "text-slate-600" : "text-white")
                // }
                >
                  Tiêu đề bài viết
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
                <i className="fas fa-circle text-orange-500 mr-2"></i> Chờ
                duyệt...
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

Pests.layout = Admin;
