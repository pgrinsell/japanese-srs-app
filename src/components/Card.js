import * as React from 'react';
import MuiCard from '@mui/joy/Card';

const Card = ({ children }) => {
  return (
    <MuiCard variant="outlined" sx={{ m: 2 }}>
      {children}
    </MuiCard>
  );
};

export default Card;
