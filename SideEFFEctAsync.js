//Wrong Usage of Async in useEffect
import React, { useEffect, useState } from 'react';

function ExampleComponen() {
  const [data, setData] = useState(null);

  // Attempting to pass an async function directly to useEffect
  useEffect(async () => {
    const response = await fetch('https://api.example.com/data');
    const result = await response.json();
    setData(result);
  }, []); // This will throw an error!
  
  return (
    <div>
      {data ? <p>{JSON.stringify(data)}</p> : <p>Loading...</p>}
    </div>
  );
}

export default ExampleComponen;
{/*Why This is Wrong
Promise Issue:
React expects the function passed to useEffect to return either undefined or a cleanup function. However, async functions always return a Promise, which React cannot handle as a cleanup function. This causes unexpected behavior or outright errors.

React Warning:
React may throw a warning like: */}

//Correct Way to Fix
{/*Wrap the asynchronous logic inside a synchronous function within useEffect, as shown in the correct usage examples earlier:*/}
useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    };
  
    fetchData(); // Explicitly call the async function
  }, []);
{/*You cannot directly pass an async function to the useEffect hook because the function passed to useEffect must return undefined or a cleanup function, and async functions always return a Promise. However, you can handle asynchronous operations inside useEffect by defining an inner async function and invoking it.

Here’s how you can handle asynchronous API calls in useEffect: */}
import React, { useEffect, useState } from 'react';

function ExampleComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs only once when the component mounts.

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ExampleComponent;
useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  {/*Important Notes:
Cleanup Function:
If the API call involves real-time data or subscriptions, make sure to include a cleanup function to prevent memory leaks.

Canceling Requests:
If the component unmounts while the request is still in progress, you can use AbortController to cancel the fetch call. */}

useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data', { signal });
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };
  
    fetchData();
  
    return () => controller.abort(); // Cleanup to abort fetch.
  }, []);
  