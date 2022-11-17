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
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable thead={thead}>
            {allUsers?.map((user) => (
              <tr key={user._id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                  {user?.hoten}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                  {user?.email}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                  {user?.sdt}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4">
                  <img
                    src={user?.anhdaidien}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 text-right">
                  <TableDropdown />
                </td>
              </tr>
            ))}
          </CardTable>
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
