import * as d3 from 'd3';
import { select } from "d3-selection";
import { geomap } from "d3-geomap";


d3.csv( "/WeatherData.csv").then((d) => {
    console.log( d[0] )
});

// var map = d3
//   .geomap()
//   .geofile("/d3-geomap/topojson/world/countries.json")
//   .draw(d3.select("#map"));

