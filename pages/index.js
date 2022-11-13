/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Link from "next/link";

import Login from "./auth/login.jsx";
import Auth from "../layouts/Auth.jsx";

export default function Index() {
  return (
    <>
      <Auth>
        <Login />
      </Auth>
    </>
  );
}
