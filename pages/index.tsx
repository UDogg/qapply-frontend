import { useEffect, useState } from 'react';
import styles from './index.module.css'; 

interface Data {
  lang: string;
  greeting: string;
  time: string; 
}


function Home() {
  const [data, setData] = useState<Data>({ lang: '', greeting: '', time: '' });
  const [time, setTime] = useState<string>('');
  const [showHelloData, setShowHelloData] = useState<boolean>(false);
  const [showTimeData, setShowTimeData] = useState<boolean>(false);



  useEffect(() => {
    fetchData();
    fetchTime();
  }, []);
  

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/hello');
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchTime() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/time');
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const { time } = await response.json();
      setTime(time);
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
  }


  
  
  
  return (
    <div className={styles.container}> {/* Apply container class */}
      <h1 className={styles.heading}>Hello Next.js</h1> {/* Apply heading class */}
      <div className={styles.buttonsContainer}> {/* Apply buttonsContainer class */}
        <button className={styles.button} onClick={handleHelloClick}>Fetch Hello Data</button> {/* Apply button class */}
        <button className={styles.button} onClick={handleTimeClick}>Fetch Time Data</button> {/* Apply button class */}
      </div>
      {showHelloData && (
        <div className={styles.dataContainer}> {/* Apply dataContainer class */}
          <p className={styles.label}>Language:</p> {/* Apply label class */}
          <p>{data.lang}</p>
          <p className={styles.label}>Greeting:</p> {/* Apply label class */}
          <p>{data.greeting}</p>
        </div>
      )}
      {showTimeData && (
        <div className={styles.dataContainer}> {/* Apply dataContainer class */}
          <p className={styles.label}>Current time:</p> {/* Apply label class */}
          <p>{time || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default Home;