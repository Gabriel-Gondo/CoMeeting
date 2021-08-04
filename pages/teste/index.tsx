import React from "react";
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CenterContainer from "components/CenterContainer";

// layout for page

import Admin from "layouts/Admin";

export default function Dashboard() {
  return (
    <Admin title="Dashboard teste">
        <CenterContainer subtitle="alguma coisa">
            <h1>
                conteudo
            </h1>
        </CenterContainer>
    </Admin>
  );
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // const apiClient = getAPIClient(ctx);

  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
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


