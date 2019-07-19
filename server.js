
const express = require( "express" );
const app = express();


app.use( express.static( __dirname + '/public' ) );
app.use("/assets/data", express.static(__dirname + '/assets/data'));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});
const port = process.env.PORT || 5001;

app.listen( port, () => { console.log( `Server is running on port ${ port }` ) } );