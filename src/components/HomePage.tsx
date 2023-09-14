import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as binService from '../services/bins';
import { Bin } from '../types';


const HomePage = () => {
  const [bins, setBins] = useState<Bin[]>([]);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const allBins = await binService.getAllBins();
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
      <h1>Welcome to RequestBin</h1>
      <p>Create or view bins to inspect HTTP requests</p>
      {/* <CreateBin /> */}
      <h2>List of Bins</h2>
      <ul>
        {bins.map(bin => (
          <li key={bin.binPath}>
            <Link to={`/bins/${bin.binPath}`}>{bin.binPath}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage;