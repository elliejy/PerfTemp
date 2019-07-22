
import { geomap } from "d3-geomap";
import { select } from "d3-selection";
import { draw, csv, geoEquirectangular, geoPath, geoMercator, geoStereographic} from 'd3';
import queryString from 'query-string';


csv( "/WeatherData.csv").then((d) => {
    console.log( d[0] )
});

document.addEventListener( 'DOMContentLoaded', ()=> {

var width = 1060,
    height = 600;

    var projection = geoEquirectangular()
   .scale(178 )
    .translate( [width / 2, height / 2] )
    .precision( .1 );

var path = geoPath()
    .projection( projection );

var svg = select( "body" ).append( "svg" )
    .attr( "width", width )
    .attr( "height", height );

var url = "https://d3js.org/world-110m.v1.json";
var url2 = "/ne_50m_populated_places_simple.json";
var url3 = "/WeatherData.csv";

const query = queryString.parse(location.search);

const queryIsValid = (
    query.temperature && query.month && query.unit
)

d3.json(url, function ( error, world ) {
    if ( error ) throw error;
    d3.json( url2, function ( err, places_geojson ) {
        d3.csv( url3, function ( err, temp ) {
        svg.append( "g" )
            .attr( "class", "land" )
            .selectAll( "path" )
            .data( topojson.feature( world, world.objects.countries ).features )
            .enter().append( "path" )
            .attr( "d", path );
        
        svg.append( "path" )
            .attr( "class", "boundary" )
            .attr( "d", path (topojson.mesh( world, world.objects.countries, function ( a, b ) { return a !== b; } ) ));
   
        svg.selectAll( "text" )
            .data( places_geojson.features)
            .enter()
            .append( "text" )
            .text( function ( d ) {
                if( queryIsValid ) {
                    const tempData = temp.filter(city=> city.City === d.properties.name)
                    if (tempData.length) {
                        const cityMonth = tempData.filter(city => city.Month === query.month)
                        if (cityMonth.length) {
                            const city = cityMonth[0]
                            if ( query.unit === 'celcius' ) {
                               if (Math.abs( Number( query.temperature ) - Number( city.HighC ) ) <= 3)
                                return city.City;
                            } else {
                                if( Math.abs( Number( query.temperature ) - Number( city.HighF ) ) <= 8)
                                return city.City;
                            }
                        }
                    } else {
                        return "";
                    }
                }
             })
            .attr( "x", function ( d ) { return projection( d.geometry.coordinates )[0] ; } )
            .attr( "y", function ( d ) { return projection( d.geometry.coordinates )[1] ; } )
            .attr( "class", "labels" );
            });
            svg.selectAll( "circle" )
            .data( places_geojson.features )
            .enter()
            .append( "circle" )
            .attr( "r", function ( d ) {
                console.log( d );
                return d.properties.pop_max / 1000000;
            } )
           .attr( "cx", function ( d ) {
               return projection( d.geometry.coordinates )[0]
           } )
            .attr( "cy", function ( d ) {
                return projection( d.geometry.coordinates )[1]
            } )
            
        });
    });


 
    select( self.frameElement ).style( "height", height + "px" );

} );


// const cityMonth = temp.filter( city => city.Month === query.month )

// const tempCity = cityMonth.filter( city => {
//     if ( query.unit === 'celcius' ) {
//         return Math.abs( Number( query.temperature ) - Number( city.HighC ) ) <= 3

//     } else {
//         return Math.abs( Number( query.temperature ) - Number( city.HighF ) ) <= 8
//     }
// } )

// return tempCity.map( city => {
//     if ( city.City === d.properties.name ) {
//         return city
//     }
// } )
        // svg.selectAll( "circle" )
        //     .data( places_geojson.features )
        //     .enter()
        //     .append( "circle" )
        //     .attr( "r", function ( d ) {
        //         console.log( d );
        //         return d.properties.pop_max / 1000000;
        //     } )
        //    .attr( "cx", function ( d ) {
        //        return projection( d.geometry.coordinates )[0]
        //    } )
        //     .attr( "cy", function ( d ) {
        //         return projection( d.geometry.coordinates )[1]
        //     } )
        // debugger