

var searchArtist = function () {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener( 'load', function ( e ) {

		var d = xhr.responseText
		var parsed = JSON.parse( d );

	} );
	xhr.send();
};

var submitPreferences = function () {

}

var squarePics = [ "Miike Snow", "Band of Horses", "Weezer", "Nirvana",
	"Joy Division", "deadMau5"
]
var longPics = [ "Kanye West", "The Notorious B.I.G.", "Jay-Z", "Nas",
	"Silversun Pickups"
]
var h1 = document.querySelector( "h1" );
var h2 = document.querySelector( "h2" );
var h3 = document.querySelector( "h3" );
var h4 = document.querySelector( "h4" );


var input = document.querySelector( "input" );
var searchButton = document.querySelector( "#searchButton" );
var popButton = document.querySelector( "#popButton" );
var wrapper = document.querySelector( ".wrapper" );
var container = document.querySelector( '#container' );

var generateTrack = function () {
	var spotWidget = document.createElement( 'iframe' )
	spotWidget.src =
		"https://embed.spotify.com/?uri=spotify:track:6eouYGSfcDirtm3u2Xtlqg"

	spotWidget.style.height = "10vh"
	spotWidget.style.width = "30vw"
	spotWidget.style.frameborder = "0"

	wrapper.appendChild( spotWidget )
}

popButton.addEventListener( "click", function () {
	var img = document.querySelector( "img" )

	var artistName = input.value.replace( " ", "+" );
	var albumName = input.value.replace( " ", "+" );
	// searchArtist( artistName, img );
	searchAlbums( albumName )

} )

var searchPopularity = function ( popQuery ) {
	var xhr = new XMLHttpRequest();
	var url = 'https://api.spotify.com/v1/search?q=artist:' + albumQuery +
		"&type=artist"
	xhr.open( "GET", url )
	xhr.addEventListener( 'load', function ( e ) {
		var obj = JSON.parse( xhr.responseText )
		// var popularity = obj.artists.
		var h3 = document.querySelector( "h3" );
		h3.innerHTML = albums;

	} )
	xhr.send();
}

var genSquares = function ( array ) {
	array.forEach( function ( artist ) {
		var xhr = new XMLHttpRequest();
		var url = "https://api.spotify.com/v1/search?q=artist:" + artist +
			"&type=artist"
		xhr.open( "GET", url )
		xhr.addEventListener( 'load', function ( e ) {

			var musicAct = JSON.parse( xhr.responseText )
			var container = document.querySelector( '#container' );

			var item = document.createElement( "div" )
			item.setAttribute( "class", "item" )
			var imgUrl = musicAct[ "artists" ][ "items" ][ 0 ][ "images" ][ 0 ].url;
			var cssDiv = 'background-image: url("' + imgUrl + '") ';
			item.setAttribute( 'style', cssDiv );

			container.appendChild( item )
			console.log( item );

		} );
		xhr.send();
	} )
};

var genLong = function ( array ) {
	array.forEach( function ( artist ) {
		var xhr = new XMLHttpRequest();
		var url = "https://api.spotify.com/v1/search?q=artist:" + artist +
			"&type=artist"
		xhr.open( "GET", url )
		xhr.addEventListener( 'load', function ( e ) {

			var musicAct = JSON.parse( xhr.responseText )
			var container = document.querySelector( '#container' );

			var item = document.createElement( "div" )
			item.setAttribute( "class", "item i2" )
			var imgUrl = musicAct[ "artists" ][ "items" ][ 0 ][ "images" ][ 0 ].url;
			var cssDiv = 'background-image: url("' + imgUrl + '") ';
			item.setAttribute( 'style', cssDiv );

			container.appendChild( item )
			console.log( item );

		} );
		xhr.send();
	} )
};

var generatePopGraph = function ( array ) {
	array.forEach( function ( artist ) {
		var xhr = new XMLHttpRequest();
		var url = "https://api.spotify.com/v1/search?q=artist:" + artist +
			"&type=artist"
		xhr.open( "GET", url )
		xhr.addEventListener( 'load', function ( e ) {

			var musicAct = JSON.parse( xhr.responseText )
			console.log( musicAct );
			var container = document.querySelector( '#container' );
			var img = document.createElement( "img" )
			img.src = musicAct[ "artists" ][ "items" ][ 0 ][ "images" ][ 0 ].url
			container.appendChild( img )
			// h1.innerText = musicAct.name

		} );
		xhr.send();
	} )
};

// genSquares( squarePics );
// genLong( longPics );

var searchArtist = function ( artist, img ) {
	var xhr = new XMLHttpRequest();
	var url = "https://api.spotify.com/v1/search?q=artist:" + artist +
		"&type=artist"
	xhr.open( "GET", url )
	xhr.addEventListener( 'load', function ( e ) {

		var musicAct = JSON.parse( xhr.responseText )
		console.log( musicAct );
		var container = document.querySelector( '#container' );
		var img = document.createElement( "img" )

		img.src = musicAct.artists.items[ 0 ].images[ 0 ].url
		container.appendChild( img )

	} );
	xhr.send();
};

var generatePics = function ( array ) {
	array.forEach( function ( artist ) {
		var xhr = new XMLHttpRequest();
		var url = "https://api.spotify.com/v1/search?q=artist:" + artist +
			"&type=artist"
		xhr.open( "GET", url )
		xhr.addEventListener( 'load', function ( e ) {

			var musicAct = JSON.parse( xhr.responseText )
			var container = document.querySelector( '#container' );
			var item = document.createElement( "div" )
			item.setAttribute( "class", "item" )
			var imgUrl = musicAct[ "artists" ][ "items" ][ 0 ][ "images" ][ 0 ].url;
			var cssDiv = 'background-image: url("' + imgUrl + '") ';
			item.setAttribute( 'style', cssDiv );

			container.appendChild( item )
			console.log( item );

		} );
		xhr.send();
	} )
};

// searchButton.addEventListener( "click", function () {
// 	var img = document.querySelector( "img" )
// 	var artistName = input.value.replace( " ", "+" );
// 	searchArtist( artistName, img );

// } )