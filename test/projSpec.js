var expect = require( "chai" )
	.expect;

describe( "a simple test", function () {
	it( "should check if truth is true", function () {
		var truth = true; // this was added after test failed - take it out to see what happens
		expect( truth ) // should tell you truth is not defined so you'll have to define it
			.to.be.true;
	} );
} );



