import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Paginationtable from "../PaginationTable";

// components

export default function CardPageVisits() {
  const allStatistical = useSelector(
    (state) => state.statistical.allStatistical
  );
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("all pest: ", allCrops);

  const itemPerPage = 5;
  const totalPage = Math.ceil(allStatistical?.length / itemPerPage);
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;

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
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-slate-700">
                Thống kê tra cứu
              </h3>
            </div>
            {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Tập dữ liệu
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Kết quả
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Ảnh
                </th>
                <th className="px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Lượt tra cứu
                </th>
              </tr>
            </thead>
            <tbody>
              {allStatistical?.length > 0 &&
                allStatistical.map((item) => (
                  <tr key={item._id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      <p>Lá: {item?.tukhoa?.la}</p>
                      <p>Thân: {item?.tukhoa?.than}</p>
                      <p>Rễ: {item?.tukhoa?.re}</p>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item?.benh?.tenBenh}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <img
                        src={item?.benh?.anh}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item?.luot}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-10">
        {/* phân trang  */}
        {allStatistical?.length > 0 && allStatistical && (
          <Paginationtable
            firstIndex={firstIndex}
            lastIndex={lastIndex}
            total={allStatistical?.length}
            handleNextPage={handleNextPage}
            handlePrePage={handlePrePage}
            totalPage={totalPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
}
