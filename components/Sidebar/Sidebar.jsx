import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import NotificationDropdown from "../Dropdowns/NotificationDropdown.jsx";
import UserDropdown from "../Dropdowns/UserDropdown.jsx";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/admin/dashboard">
            <a
              href="#pablo"
              className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold "
            >
              <img
                src="https://res.cloudinary.com/ak-tracuusaubenh/image/upload/v1668310702/ak-tracuusaubenh/Screenshot_2022-09-02_151147-removebg-preview_pu5byn.png"
                alt=""
              />
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-slate-200">
              <div className="flex flex-wrap">
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12  border-solid  border-slate-500 placeholder-slate-300 text-slate-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            {/* <h6 className="md:min-w-full text-slate-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Admin Layout Pages
            </h6> */}
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/admin/dashboard">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold flex " +
                      (router.pathname.indexOf("/admin/dashboard") !== -1
                        ? "text-slate-900 hover:text-slate-600"
                        : "text-slate-400 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/dashboard") !== -1
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    Bảng điều khiển
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/account">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/account") !== -1
                        ? "text-slate-900 hover:text-slate-600"
                        : "text-slate-400 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-user mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/account") !== -1
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    Tài Khoản
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/users">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/users") !== -1
                        ? "text-slate-900 hover:text-slate-600"
                        : "text-slate-400 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/users") !== -1
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    Quản lý người dùng
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/pests">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/pests") !== -1
                        ? "text-slate-900 hover:text-slate-600"
                        : "text-slate-400 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/pests") !== -1
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    Quản lý sâu bệnh
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/crops">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/crops") !== -1
                        ? "text-slate-900 hover:text-slate-600"
                        : "text-slate-400 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/crops") !== -1
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    Quản lý loại cây trồng
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/pesticide">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/pesticide") !== -1
                        ? "text-slate-900 hover:text-slate-600"
                        : "text-slate-400 hover:text-slate-700")
                    }
                  >
                    <i
                      className={
                        "fas fa-table mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/pesticide") !== -1
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    Quản lý thuốc đặc trị
                  </a>
                </Link>
              </li>

              {/* <li className="items-center">
                <Link href="/admin/maps">
                  <a
                    href="#pablo"
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf("/admin/maps") !== -1
                        ? "text-slate-500 hover:text-slate-600"
                        : "text-slate-700 hover:text-slate-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-map-marked mr-2 text-sm " +
                        (router.pathname.indexOf("/admin/maps") !== -1
                          ? "opacity-75"
                          : "text-slate-300")
                      }
                    ></i>{" "}
                    Maps
                  </a>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
