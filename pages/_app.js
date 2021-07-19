import React from "react";

import App from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import { AuthProvider } from './contexts/AuthContext'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    );
  }
}
