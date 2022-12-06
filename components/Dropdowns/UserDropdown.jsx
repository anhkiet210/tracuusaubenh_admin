import React from "react";
import { createPopper } from "@popperjs/core";
import { useDispatch, useSelector } from "react-redux";

//func
import { setInfoCurrentUser, setTokenRedux } from "../../redux/slice/authSlice";
import { useRouter } from "next/router";

const UserDropdown = () => {
  const user = useSelector((state) => state.auth.currentUser);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleLogout = () => {
    try {
      if (typeof window !== undefined) {
        console.log("logout");
        localStorage.removeItem("Token");
        dispatch(setInfoCurrentUser(null));
        dispatch(setTokenRedux(null));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <a
        className="text-slate-500 block"
        href="#ak"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm overflow-hidden text-white bg-slate-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full h-full object-cover rounded-full align-middle border-none shadow-lg"
              src={user?.anhdaidien}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a> */}
        {/* <div className="h-0 my-2 border border-solid border-slate-100" /> */}
        <button
          className={
            "text-sm p-2 font-normal w-full whitespace-nowrap bg-transparent text-slate-700 md:text-base"
          }
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
