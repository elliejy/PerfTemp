import * as d3 from 'd3';

d3.csv( "/WeatherData.csv").then((d) => {
    console.log( d[0] )
});