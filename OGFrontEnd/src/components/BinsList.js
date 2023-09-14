import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import binService from '../services/bins'; // Adjust the import based on your folder structure

const BinsList = () => {
  const [bins, setBins] = useState([]);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const allBins = await binService.getAll();
        setBins(allBins);
        console.log(`Fetched ${allBins.length} bins, first one is:`, allBins[0]);
      } catch (error) {
        console.error("Failed to fetch bins:", error);
        // Handle the error appropriately here
      }
    };

    fetchBins();
  }, []);

  return (
    <div>
      <h2>List of Bins</h2>
      <ul>
        {bins.map(bin => (
          <li key={bin.binId}>
            <Link to={`/bins/${bin.binId}`}>{bin.binId}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BinsList;
