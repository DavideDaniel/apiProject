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
		db.del(data.value)
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
		for ( key in user ) {
			console.log( key + user.name );
			console.log( key + user.genres );
			console.log( key + user.artists );
		}
		console.log();
	} )

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

	var name = req.params.name;
	var genre1 = req.body.genre1;
	var genre2 = req.body.genre2;
	var artist1 = req.body.artist1;
	var artist2 = req.body.artist2;
	var artist3 = req.body.artist3;

	userDB.forEach( function ( user ) {
		console.log(user.name);
		if ( user.name === name ) {
			console.log( "inside prefs " + user );
			var arrayOfgenres = user.genres.push( genre1, genre2 )
			var arrayOfartists = user.artists.push( artist1, artist2,
				artist3 )
		}
	} )

	db.put( user.name, user )

	console.log( arrayOfartists );

	res.render( 'result.ejs', {
		arrayOfartists: arrayOfartists,
		// arrayOfgenres: arrayOfgenres
	} );
} );

app.listen( 3000 );

console.log( "Server listening on port: 3000" );