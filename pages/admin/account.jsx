import React from "react";

// components

import CardAccount from "../../components/Cards/CardAccount.jsx";

// layout for page

import Admin from "../../layouts/Admin.jsx";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardAccount />
        </div>
        {/* <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div> */}
      </div>
    </>
  );
}

Settings.layout = Admin;
