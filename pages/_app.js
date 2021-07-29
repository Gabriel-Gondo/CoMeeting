import React from "react";

import App from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import { AuthProvider } from 'contexts/AuthContext'
import { SnackbarProvider } from 'notistack';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    const theme = createTheme({
      palette: {
        primary: {
          light: '#0b8ea7',
          main: '#11CBEF',
          dark: '#40d5f2',
          contrastText: '#fff',
        },
        secondary: {
          light: '#8e8a8a',
          main: '#CBC6C6',
          dark: '#d5d1d1',
          contrastText: '#000',
        },
      },
    });
    return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </AuthProvider>
    );
  }
}
