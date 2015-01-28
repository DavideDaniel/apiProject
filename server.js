var express = require( 'express' );
var ejs = require( 'ejs' );
var bodyParser = require( 'body-parser' );
var app = express();
var levelup = require( "level" )
var db = levelup( "./musicApp", {
	valueEncoding: "json"
} );
var userDB = [];

db.createReadStream()
	.on( 'data', function ( data ) {

		console.log( "in the stream full data " + data.value )
		userDB.push( data.value )
		var keys = Object.keys( data.value );
		for ( var i = 0; i < keys.length; i++ ) {
			var key = keys[ i ];
			var value = data.value[ key ];
			console.log( key + ":" + value );

		}
		console.log( "-----------------" );
	} )
	.on( 'error', function ( err ) {
		console.log( 'Oh my!', err )
	} )

.on( 'end', function () {
	console.log( 'Stream closed' )
} );

console.log( "SERVER STARTING" + userDB );

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

app.use( bodyParser.urlencoded( {
	extended: true
} ) );

app.use( express.static( __dirname + '/public' ) );

app.get( '/', function ( req, res ) {
	db.createReadStream()
		.on( 'data', function ( data ) {

			console.log( "in the stream full data " + data.value )
			var keys = Object.keys( data.value );
			for ( var i = 0; i < keys.length; i++ ) {
				var key = keys[ i ];
				var value = data.value[ key ];

				console.log( key + ":" + value );

			}
			console.log( "-----------------" );
		} )
		.on( 'error', function ( err ) {
			console.log( 'Oh my!', err )
		} )

	.on( 'end', function () {
		console.log( 'Stream closed' )
	} );

	console.log( "inside / get " + userDB );

	res.render( 'index.ejs', {} );
} );

app.post( '/login', function ( req, res ) {
	var name = req.body.name;
	var email = req.body.email;
	var user = new User( name, email );

	db.put( user.name, user );
	console.log( "inside login " + user.name );
	console.log( "inside login " + userDB );
	updateLdb( userDB, db, user )
	res.render( 'prefs.ejs', {
		name: name
	} );
} );

app.post( '/:name/prefs', function ( req, res ) {
	var genres = []
	var artists = []

	var name = req.params.name;
	genres.push( req.body.genre1, req.body.genre2 )
	artists.push( req.body.artist1, req.body.artist2, req.body.artist3 )

	var packedToGo = JSON.stringify( artists );

	updatePrefs( userDB, db, name )

	res.render( 'result.ejs', {
		array: packedToGo
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