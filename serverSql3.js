var express = require( 'express' );
var cors = require( 'cors' );
var bodyParser = require( 'body-parser' );
var sqlite3 = require("sqlite3").verbose();
var app = express();
var file = "./musicUsers.db";

var db = new sqlite3.Database( "pets.db" );
app.use( cors() );
app.use( bodyParser.json( {
  extended: false
} ) );

app.use( express.static( __dirname + '/public' ) );

var echoKey = process.env.ECHOAPI;

var User = function ( name, email ) {
	this.name = name;
	this.email = email;
	this.artists = [];
	this.genres = [];
};

var searchArtist = function () {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener( 'load', function ( e ) {
		var d = xhr.responseText
		var parsed = JSON.parse( d );
	} );
	xhr.send();
};

app.get( '/', function ( req, res ) {

	res.render( 'index.ejs', {} );
} );

app.post( '/login', function ( req, res ) {
	var name = req.body.name;
	var email = req.body.email;
	var user = new User( name, email );

	db.run( user.name, user );
	console.log( "inside login " + user.name );
	console.log( "inside login " + userDB );
	updateLdb( userDB, db, user )
	var packedKey = JSON.stringify(echoKey)
	res.render( 'prefs.ejs', {
		name: name,
		echoKey: packedKey
	} );
} );

app.post( '/:name/prefs', function ( req, res ) {
	var genres = []
	var artists = []

	var name = req.params.name;
	genres.push( req.body.genre1, req.body.genre2 )
	artists.push( req.body.artist1, req.body.artist2, req.body.artist3 )

	var packedToGo = JSON.stringify( artists );
	var packedKey = JSON.stringify(echoKey)
	updatePrefs( userDB, db, name )
	console.log(packedKey);
	res.render( 'result.ejs', {
		array: packedToGo,
		echoKey: packedKey
	} );
} );


var updateLdb = function ( userDB, db, name, user ) {
	console.log( "function started" )
	userDB.forEach( function ( user ) {
		console.log( "inside the forEACH" + user.name );
		if ( user.name !== name ) {
			console.log( name );
			console.log( "this should be the object" +user);

		}
	} )
}

var updatePrefs = function ( userDB, db, name ) {
	console.log( "function started" )
	userDB.forEach( function ( user ) {
		console.log( "inside the forEACH" + user.name );
		if ( user.name !== name ) {
			console.log( name );

		}
	} )
}

app.listen( 3000 );

console.log( "Server listening on port: 3000" );