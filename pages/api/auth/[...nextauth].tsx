import NextAuth from "next-auth";
import { NextApiRequest,NextApiResponse } from "next-auth/internals/utils";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
};


export default(req: NextApiRequest,res: NextApiResponse): void | Promise<void> => 
    NextAuth(req,res,options)