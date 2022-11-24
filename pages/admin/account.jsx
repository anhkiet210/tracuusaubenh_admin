import React from "react";
import { useDispatch, useSelector } from "react-redux";

//func
import { setInfoCurrentUser } from "../../redux/slice/authSlice.js";

// components
import CardAccount from "../../components/Cards/CardAccount.jsx";

// layout for page

import Admin from "../../layouts/Admin.jsx";

export default function Account() {
  const user = useSelector((state) => state.auth.currentUser);
  // const dispatch = useDispatch();
  // dispatch(setInfoCurrentUser(user));
  console.log("account: ", user);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardAccount user={user} />
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}

Account.layout = Admin;
