import React, { useContext } from "react";
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
// components
import { getAPIClient } from '../services/axios'
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";


export default function Admin({ title,children }) {

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar title={title}/>
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full" style={{marginTop: '-10rem'}}>
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}




