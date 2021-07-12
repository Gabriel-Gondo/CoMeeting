import React from "react";

import App from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";


export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  }
}
