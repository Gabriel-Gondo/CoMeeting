import { NextApiRequest,NextApiResponse } from "next";
import connect from '../../../utils/database';
import User from '../../../types/user'

interface ResponseType {
  message: string;
}

export default async function helloAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        find(req,res)
        break;
      case 'POST':
        create(req,res)
        break;

    
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json({ message: 'problemas' });
  }
  


}



const find = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const { db } = await connect();
  const response = await db.collection('users').find()
  console.log('response',response)
 
  return res.status(200).json({ message: response.toString() });
}

const create = async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
  const { db } = await connect();
  const response = await db.collection('users').insertOne({
    name: 'Gabriel',
    age: '21'
  })
 
  return res.status(200).json({ message: response.ops[0] });
}
