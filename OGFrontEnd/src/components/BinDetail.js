import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import binService from '../services/bins';

const BinDetail = () => {
  const [bin, setBin] = useState(null);
  const [requests, setRequests] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const { binId } = useParams();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`http://localhost:3001/api/bins/${binId}/requests`);
    setIsCopied(true);

    // Reset the isCopied state after 3 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchBin = async () => {
      try {
        const fetchedBin = await binService.getOne(binId);
        setBin(fetchedBin);
      } catch (error) {
        console.error(`Failed to fetch bin with id ${binId}:`, error);
        // Handle the error appropriately here
      }
    };

    const fetchRequests = async () => {
      try {
        const fetchedRequests = await binService.getRequestsByBinId(binId);
        console.log(`Fetched ${fetchedRequests.length} requests for bin ${binId}, first one is: ${fetchedRequests[0]}`);
        setRequests(fetchedRequests);
      } catch (error) {
        console.error(`Failed to fetch requests for bin with id ${binId}:`, error);
      }
    };

    fetchBin();
    fetchRequests();
  }, [binId]);

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:3001/api/bins/${binId}/events`);
  
    // This event listener will be called every time a new request is made to the bin
    eventSource.onmessage = (event) => {
      console.log(`requests: ${JSON.stringify(requests)}`);
      const newRequest = JSON.parse(event.data);
      setRequests((requests) => [...(Array.isArray(requests) ? requests : []), newRequest]);
    };
  
    return () => {
      eventSource.close();
    };
  }, []);
  

  if (!bin ) {
    console.log(`Bin: ${bin}, Requests: ${requests}`)
    return <div>Loading...</div>;
  }

  if (requests == null) {
    return <div>Waiting for requests...</div>;
  }

  return (
    <div>
      <h2>Bin Detail - {bin.binId}</h2>
      <p>Created At: {new Date(bin.createdAt).toLocaleString()}</p>
      <p>Last Request: {new Date(bin.lastRequest).toLocaleString()}</p>
      <p>Number of Requests: {requests.length}</p>
      <p>The unique URL to trigger this workflow is:</p>
      <p>  
        <code>{`http://your-server.com/api/bins/${binId}/requests`}</code>
        <span 
          className={`mdi ${isCopied ? 'mdi-check' : 'mdi-content-copy'}`} 
          onClick={handleCopyClick}
          style={{ cursor: 'pointer' }}
        >
        </span>
      </p>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            <Link to={`/bins/${bin.binId}/requests/${request.id}`}>{request.method} {request.url}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BinDetail;
