var express = require( 'express' );
var ejs = require( 'ejs' );
var bodyParser = require( 'body-parser' );
var app = express();

var searchArtist = function () {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener( 'load', function ( e ) {

		var d = xhr.responseText
		var parsed = JSON.parse( d );

	} );
	xhr.send();
};

app.use( bodyParser.urlencoded( {
	extended: true
} ) );

app.use( express.static( __dirname + '/public' ) );

app.get( '/', function ( req, res ) {
	res.render( 'index.ejs', {} );
} );

app.listen( 3000 );

console.log( "Server listening on port: 3000" );