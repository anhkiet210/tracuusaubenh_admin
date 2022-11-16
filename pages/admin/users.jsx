import React from "react";
import { useSelector } from "react-redux";

// components

import CardTable from "../../components/Cards/CardTable.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";

// layout for page

import Admin from "../../layouts/Admin.jsx";

const thead = [
  {
    id: 1,
    name: "Họ tên",
  },
  {
    id: 2,
    name: "Email",
  },
  {
    id: 3,
    name: "Số điện thoại",
  },
  {
    id: 4,
    name: "Ảnh đại diện",
  },
];

export default function Tables() {
  const allUsers = useSelector((state) => state.auth.allUsers);
  console.log("người dùng: ", allUsers);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable thead={thead}>
            <tr>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                tên người dùng
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                email@gmail.com
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                $2,500 USD
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                <img
                  src="/img/bootstrap.jpg"
                  className="h-12 w-12 bg-white rounded-full border"
                  alt="..."
                ></img>{" "}
              </td>
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 text-right">
                <TableDropdown />
              </td>
            </tr>
          </CardTable>
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
