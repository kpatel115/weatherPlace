import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// change this mui card source code to display weather from input 
 
const DataCard = ({ weatherData }) => {
  if (!weatherData) return null;
  
  let temp = weatherData.main.temp 
  let convertedTemp = (temp - 273.15) * 9/5 + 32

  return (

    <Card>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Weather in {weatherData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Temp: {Math.round(convertedTemp)} °F
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
          <br/>
          Skies: {weatherData.weather[0].description}
          <br/>
          Humidity: {weatherData.main.humidity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add</Button> 
        {/*  adds to weatherLogs table in db */}
        <Button size="small">Learn More</Button>
        
      </CardActions>
    </Card>
  );
}

export default DataCard;