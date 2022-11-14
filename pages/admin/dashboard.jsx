import React from "react";

// components

import CardLineChart from "../../components/Cards/CardLineChart.jsx";
import CardBarChart from "../../components/Cards/CardBarChart.jsx";
import CardPageVisits from "../../components/Cards/CardPageVisits.jsx";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.jsx";
import TableDropdown from "../../components/Dropdowns/TableDropdown.jsx";

// layout for page

import Admin from "../../layouts/Admin.jsx";
import CardTable from "../../components/Cards/CardTable.jsx";

const thead = [
  {
    id: 1,
    name: "Tiêu đề bài viết",
  },
  {
    id: 2,
    name: "Ảnh bài viết",
  },
  {
    id: 3,
    name: "Trạng thái",
  },
  {
    id: 4,
    name: "Tác giả",
  },
];

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
        <div className="w-full  px-4">
          <CardTable name="Bài viết chờ duyệt" thead={thead}>
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

Dashboard.layout = Admin;
