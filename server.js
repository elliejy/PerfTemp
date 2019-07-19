
const express = require( "express" );
const app = express();

app.use( express.static( __dirname + '/public' ) );

const port = process.env.PORT || 5001;

app.listen( port, () => { console.log( `Server is running on port ${ port }` ) } );