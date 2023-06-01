import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './index.module.css';

interface Data {
  lang: string;
  greeting: string;
  time: string;
}

let host = ''; // Initialize host as an empty string
let port = ''; // Initialize port as an empty string

if (typeof window !== 'undefined') {
  // Check if the code is running in the browser environment
  host = window.location.hostname;
  port = window.location.port;
}

function Home() {
  const [data, setData] = useState<Data>({ lang: '', greeting: '', time: '' });
  const [time, setTime] = useState<string>('');
  const [showHelloData, setShowHelloData] = useState<boolean>(false);
  const [showTimeData, setShowTimeData] = useState<boolean>(false);
  const [employeeType, setEmployeeType] = useState<string>('');

  useEffect(() => {
    fetchData();
    fetchEmployeeType();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get<Data>(`http://${host}:8000/api/v1/hello`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTime() {
    try {
      const response = await axios.get<{ time: string }>(`http://${host}:8000/api/v1/time`);
      setTime(response.data.time);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchEmployeeType() {
    try {
      const response = await axios.get<{ employeetype: string }>(`http://${host}:${port}/api/v1/whoami`);
      setEmployeeType(response.data.employeetype);
    } catch (error) {
      console.error(error);
    }
  }

  function handleHelloClick() {
    setShowHelloData(true);
    setShowTimeData(false);
  }

  function handleTimeClick() {
    setShowHelloData(false);
    setShowTimeData(true);
    fetchTime(); // Fetch the current time when the button is clicked
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Hello Next.js</h1>
      {employeeType === 'fac' && (
        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={handleHelloClick}>
            Fetch Hello Data
          </button>
          <button className={styles.button} onClick={handleTimeClick}>
            Fetch Time Data
          </button>
        </div>
      )}
      {employeeType !== 'fac' && (
        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={handleTimeClick}>
            Fetch Time Data
          </button>
        </div>
      )}
      {showHelloData && (
        <div className={styles.dataContainer}>
          <p className={styles.label}>Language:</p>
          <p>{data.lang}</p>
          <p className={styles.label}>Greeting:</p>
          <p>{data.greeting}</p>
        </div>
      )}
      {showTimeData && (
        <div className={styles.dataContainer}>
          <p className={styles.label}>Current time:</p>
          <p>{time || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
