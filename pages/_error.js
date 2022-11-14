import React, { useEffect } from "react";
import Router from "next/router";

const _error = () => {
  useEffect(() => {
    Router.push("/admin/dashboard");
  }, []);

  return <div />;
};
export default _error;
