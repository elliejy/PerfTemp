
import { geomap } from "d3-geomap";
import { select } from "d3-selection";
import {draw, csv} from 'd3';


csv( "/WeatherData.csv").then((d) => {
    console.log( d[0] )
});

document.addEventListener( 'DOMContentLoaded', ()=> {
    // var map = geomap()
    // map.geofile("./assets/data/countries.json")
    // map.draw(select("#map"));

var svg = d3.select( "svg" );

var path = d3.geoPath();

    d3.json( "https://d3js.org/world-110m.v1.json", function ( error, us ) {
    if ( error ) throw error;

    svg.append( "g" )
        .attr( "class", "states" )
        .selectAll( "path" )
        .data( topojson.feature( us, us.objects.countries ).features )
        .enter().append( "path" )
        .attr( "d", path )

    svg.append( "path" )
        .attr( "class", "state-borders" )
        .attr( "d", path( topojson.mesh( us, us.objects.countries, function ( a, b ) { return a !== b; } ) ) );
} );
})
// var width = 960,
//     height = 600;

// var projection = d3.geoConicEqualArea()
//     .scale( 153 )
//     .translate( [width / 2, height / 2] )
//     .precision( .1 );

// var path = d3.geoPath()
//     .projection( projection );

// var graticule = d3.geoGraticule();

// var svg = d3.select( "body" ).append( "svg" )
//     .attr( "width", width )
//     .attr( "height", height );

// d3.json( "data/world-110m.json", function ( error, world ) {
//     if ( error ) throw error;
//     console.log( world )
//     console.log( topojson.feature( world, world.objects.land ) );
//     console.log( graticule )
//     svg.append( "path" )
//         .datum( topojson.feature( world, world.objects.land ) )
//         .attr( "class", "land" )
//         .attr( "d", path );
//     svg.append( "path" )
//         .datum( topojson.mesh( world, world.objects.countries, function ( a, b ) { return a !== b; } ) )
//         .attr( "class", "boundary" )
//         .attr( "d", path );
//     svg.append( "path" )
//         .datum( graticule )
//         .attr( "class", "graticule" )
//         .attr( "d", path );
// } );
// d3.select( self.frameElement ).style( "height", height + "px" );