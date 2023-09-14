import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import requestService from '../services/requests';

const RequestDetail = () => {
  const [request, setRequest] = useState(null);
  const { requestId } = useParams();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const fetchedRequest = await requestService.getOne(requestId);
        console.log(`Fetched request with id ${requestId}, first one is: ${JSON.stringify(fetchedRequest)}`);
        setRequest(fetchedRequest);
      } catch (error) {
        console.error(`Failed to fetch request with id ${requestId}:`, error);
        // Handle the error appropriately here
      }
    };

    fetchRequest();
  }, [requestId]);

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Request Detail</h2>
      <p><strong>Method:</strong> {request.method} </p>
      <p><strong>URL:</strong> {request.url} </p>
      <p><strong>Headers:</strong></p>
      <ul>
        {Object.keys(request.headers).map(key => (
          <li key={key}><strong>{key}:</strong> {request.headers[key]}</li>
        ))}
      </ul>
      <p><strong>Body:</strong> {request.body} </p>

    </div>
  );
};

export default RequestDetail;