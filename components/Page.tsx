import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode } from 'react';
// material
import { Box, BoxProps } from '@material-ui/core';

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
}


export default function Page({ children, title = '', ...other }){
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  )
}
