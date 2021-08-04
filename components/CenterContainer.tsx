import { Helmet } from "react-helmet-async";
import { forwardRef, ReactNode } from "react";
// material
import { Box, BoxProps } from "@material-ui/core";

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
}

export default function Page({ children, subtitle = "" }) {
  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white "
      }
      style={{ minHeight: "73vh" }}
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className={"font-semibold text-lg text-blueGray-700"}>
              {subtitle}
            </h3>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
