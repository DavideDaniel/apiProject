var express = require( 'express' );
var ejs = require( 'ejs' );
var bodyParser = require( 'body-parser' );
var app = express();

var userDB = {};
var User = function ( name, email ) {
	this.name = name;
	this.email = email;
	this.preferences = {
		artists: [],
		genres: []
	}
};

var searchArtist = function () {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener( 'load', function ( e ) {
		var d = xhr.responseText
		var parsed = JSON.parse( d );
	} );
	xhr.send();
};

function traversify( object ) {
	for ( key in object ) {
		if ( typeof ( object[ key ] ) == "object" ) {
			console.log( "Object " + key );
		}

		if ( object[ key ] !== null && typeof ( object[ key ] ) == "object" ) {
			console.log( "---- " + key );
			traversify( object[ key ] );
		}
	}
}

app.use( bodyParser.urlencoded( {
	extended: true
} ) );

app.use( express.static( __dirname + '/public' ) );

app.get( '/', function ( req, res ) {
	res.render( 'index.ejs', {} );
} );

app.post( '/login', function ( req, res ) {
	var name = req.body.name;
	var email = req.body.email;
	var user = new User( name, email );
	userDB[ user.name ] = user;
	traversify( userDB )
	console.log( "login " + user );
	console.log( "login " + userDB );
	console.log( "login " + userDB.name );

	res.render( 'prefs.ejs', {
		name: name
	} );
} );

app.post( '/:name/prefs', function ( req, res ) {
	
	var name = req.params.name;
	var genre1 = req.body.genre1;
	var genre2 = req.body.genre2;
	var artist1 = req.body.artist1;
	var artist2 = req.body.artist2;
	var artist3 = req.body.artist3;
	// userDB.name.preferences.genres.push( genre1, genre2 )
	// userDB.name.preferences.artists.push( artist1, artist2, artist3 )
	traversify( userDB )
	// console.log( "prefs " + userDB.name.preferences.genres );
	// console.log( "prefs " + userDB.name.preferences.artists );

	// console.log( "prefs " + userDB );
	// console.log( "prefs " + userDB.name );

	// var arrayOfgenres = userDB.name.preferences.genres
	// var arrayOfartists = userDB.name.preferences.artists
	// console.log( arrayOfartists );
	// console.log( arrayOfgenres );
	res.render( 'result.ejs', {
		// arrayOfartists: arrayOfartists,
		// arrayOfgenres: arrayOfgenres
	} );
} );

app.listen( 3000 );

console.log( "Server listening on port: 3000" );