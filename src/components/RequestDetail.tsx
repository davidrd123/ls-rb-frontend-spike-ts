import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as requestService from '../services/requests';
import { Request } from '../types';

const RequestDetail = () => {
  const [request, setRequest] = useState<Request | null>(null);
  const { requestId } = useParams< { requestId: string } >();

  useEffect(() => {
    const fetchRequest = async () => {
      if (requestId == null) {
        return;
      }
      try {
        const fetchedRequest = await requestService.getRequestById(requestId);
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
      <p><strong>Method:</strong> {request.event.method} </p>
      <p><strong>URL:</strong> {request.event.url} </p>
      <p><strong>Headers:</strong></p>
      <ul>
        {Object.keys(request.event.headers).map(key => (
          <li key={key}><strong>{key}:</strong> {String(request.event.headers[key])}</li>
        ))}
      </ul>
      <p><strong>Body:</strong> {JSON.stringify(request.event.body)} </p>

    </div>
  );
};

export default RequestDetail;