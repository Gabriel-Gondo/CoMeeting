import React from "react";
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "layouts/Admin";

export default function Dashboard() {
  return (
    <Admin title="Dashboard teste">
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </Admin>
  );
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // const apiClient = getAPIClient(ctx);
  console.log('ctx',ctx)
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    console.log('token',token)
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      }
    }
  }

  // await apiClient.get('/users')

  return {
    props: {}
  }
}


