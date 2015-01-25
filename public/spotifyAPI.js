var api = require( "./apikeys" );

var key = api.keys.spotify

console.log( key );



var searchArtist = function () {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener( 'load', function ( e ) {

		var d = xhr.responseText
		var parsed = JSON.parse( d );

	} );
	xhr.send();
};