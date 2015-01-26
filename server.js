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
	} )
	.on( 'error', function ( err ) {
		console.log( 'Oh my!', err )
	} )

.on( 'end', function () {
	console.log( 'Stream closed' )
} );

console.log( "at server start " + userDB );

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
	console.log( "inside / get " + userDB );

	userDB.forEach( function ( user ) {
		console.log( user.name );
		console.log( user.email );
		console.log( user.genres );
		console.log( user.artists );
		console.log( "-------------" );
	} );

	res.render( 'index.ejs', {} );
} );

app.post( '/login', function ( req, res ) {
	var name = req.body.name;
	var email = req.body.email;
	var user = new User( name, email );

	db.put( user.name, user );
	console.log( "inside login " + user.name );
	console.log( "inside login " + userDB );

	res.render( 'prefs.ejs', {
		name: name
	} );
} );

app.post( '/:name/prefs', function ( req, res ) {
	var arrayOfgenres = []
	var arrayOfartists = []

	var name = req.params.name;
	arrayOfgenres.push( req.body.genre1 )
	arrayOfgenres.push( req.body.genre2 )
	arrayOfartists.push( req.body.artist1 )
	arrayOfartists.push( req.body.artist2 )
	arrayOfartists.push( req.body.artist3 )

	console.log( arrayOfartists );
	name = {
		genres: arrayOfgenres,
		artists: arrayOfartists
	}

	console.log( "trying literal obj"+ name.name );
	console.log( "trying literal obj"+ name.genres );
	console.log( "trying literal obj"+ name.artists );
	userDB.forEach( function ( user ) {
		console.log( user.name );
		if ( user.name === name ) {
			console.log( "inside prefs " + user.name );

			db.createReadStream()
				.on( 'data', function ( data ) {

					console.log( "inside preferences, looping through db" + data.value )
					console.log( data.value.name );
				} )
				.on( 'error', function ( err ) {
					console.log( 'Oh my!', err )
				} )

			.on( 'end', function () {
				console.log( 'Stream closed' )
			} );
		};
	} );

	// db.put( user.name, user )

	console.log( "outgoing array " + arrayOfartists );

	res.render( 'result.ejs', {
		arrayOfartists: arrayOfartists,
		// arrayOfgenres: arrayOfgenres
	} );
} );

var addPreferences = function ( user, genre1, genre2 ) {};

app.listen( 3000 );

console.log( "Server listening on port: 3000" );