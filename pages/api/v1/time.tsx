// pages/api/time.ts
import { NextApiHandler } from 'next';

async function fetchTime() {
  const response = await fetch('http://localhost:8000/api/v1/time');
  const time = await response.json();
  return time;
}

const handler: NextApiHandler = async (req, res) => {
  const time = await fetchTime();
  res.status(200).json(time);
};

export default handler;
