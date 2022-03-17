import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        -----
      </Typography>
      <Typography variant="h5" component="div">
        Character
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Total:
      </Typography>
      <Typography variant="body2">
        last updated:
        <br />
        {'"xx/xx/xx"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Edit</Button>
    </CardActions>
  </React.Fragment>
);

export default function Cardlist() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
