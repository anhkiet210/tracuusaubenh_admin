import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { Provider } from "react-redux";
import store from "../redux/store.js";
import { SnackbarProvider } from "notistack";

import PageChange from "../components/PageChange/PageChange.jsx";
import AuthCheck from "../layouts/AuthCheck.jsx";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";

Router.events.on("routeChangeStart", (url) => {
  // console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>tracuusaubenh-admin</title>
          <link
            rel="shortcut icon"
            href="https://res.cloudinary.com/ak210/image/upload/v1667751701/ak-tracuusaubenh/Screenshot_2022-09-02_152018-removebg-preview_1_meicoh.png"
          />
          <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
        </Head>
        <Provider store={store}>
          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {/* <AuthCheck> */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* </AuthCheck> */}
          </SnackbarProvider>
        </Provider>
      </React.Fragment>
    );
  }
}
