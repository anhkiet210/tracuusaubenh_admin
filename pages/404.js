import React, { useEffect } from "react";
import Router from "next/router";

const Error404 = () => {
  useEffect(() => {
    Router.push("/admin/dashboard");
  }, []);

  return <div />;
};

export default Error404;
