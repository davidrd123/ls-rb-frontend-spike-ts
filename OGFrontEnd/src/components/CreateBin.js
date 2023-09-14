import React from 'react';
import binService from '../services/bins';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const CreateBin = () => {
  const history = useNavigate();

  const createNewBin = async () => {
    const newBin = await binService.create();
    history(`/bins/${newBin.binId}`);
    console.log(newBin);
  }

  return (
    <div>
      <Button variant="contained" onClick={createNewBin}>
        Create New Bin
      </Button>
    </div>
  );
}

export default CreateBin;
