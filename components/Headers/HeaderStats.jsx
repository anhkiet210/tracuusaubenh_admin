import React from "react";
import { useSelector } from "react-redux";

// components
import CardStats from "../Cards/CardStats.jsx";

export default function HeaderStats() {
  const allUsers = useSelector((state) => state.auth.allUsers);
  const allPests = useSelector((state) => state.pest.allPests);
  const allPostPending = useSelector((state) => state.post.allPostPending);
  // console.log("post pending: ", allPostPending);
  return (
    <>
      {/* Header */}
      <div className="relative bg-slate-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="bài viết chờ duyệt"
                  statTitle={allPostPending?.length}
                  statIconName="far fa-newspaper"
                  statIconColor="bg-red-500"
                  // statPercentColor="text-emerald-500"
                  // statPercent="3.48"
                  // statDescripiron="Since last month"
                  // statArrow="up"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="tổng số bệnh"
                  statTitle={allPests?.length}
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                  // statPercentColor="text-red-500"
                  // statArrow="down"
                  // statDescripiron="Since last week"
                  // statPercent="3.48"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="số lượng người dùng"
                  statTitle={allUsers?.length}
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                  // statPercentColor="text-orange-500"
                  // statDescripiron="Since yesterday"
                  // statPercent="1.10"
                  // statArrow="down"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statPercent="12"
                  statIconName="fas fa-percent"
                  // statArrow="up"
                  // statPercentColor="text-emerald-500"
                  // statDescripiron="Since last month"
                  // statIconColor="bg-slate-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
