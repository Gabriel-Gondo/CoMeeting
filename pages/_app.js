import React from "react";

import App from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import { AuthProvider } from 'contexts/AuthContext'
import { SnackbarProvider } from 'notistack';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <AuthProvider>
        <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </AuthProvider>
    );
  }
}
