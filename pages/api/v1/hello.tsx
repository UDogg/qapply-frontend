// pages/api/hello.ts
import { NextApiHandler } from 'next';

async function fetchData() {
  const response = await fetch('http://localhost:8000/api/v1/hello');
  const data = await response.json();
  return data;
}

const handler: NextApiHandler = async (req, res) => {
  const data = await fetchData();
  res.status(200).json(data);
};

export default handler;