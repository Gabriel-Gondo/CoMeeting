import React, { useContext } from "react";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import colors from "styles/colors"

// components
import { getAPIClient } from "../services/axios";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";

export default function Admin({ title, children }) {
  return (
    <>
      <div className="relative ">
        <>
          {/* Navbar */}
          <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
            <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
              {/* Brand */}
              <a
                className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                {title}
              </a>
            </div>
          </nav>
          {/* End Navbar */}
        </>
        {/* Header */}
        <div className="relative md:pt-32 pb-32 pt-12" style={{backgroundColor: colors.primary}}>
            <div className="px-4 md:px-10 mx-auto w-full">
            <div>
                
        
            </div>
            </div>
        </div>
        <div className="px-4 md:px-10 mx-auto w-full" style={{marginTop: '-10rem'}}>
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
