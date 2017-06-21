var assert = require('chai').assert;
var hometrack = require('../app/hometrack');

var sample_invalid = "{\"asdasda\"}";
var sample_clean = JSON.stringify(require('./stubs/sample_clean'));
var sample_bad_address = JSON.stringify(require('./stubs/sample_bad_address'));
var sample_missing_number = JSON.stringify(require('./stubs/sample_missing_number'));

describe('Hometrack', function() {
	describe('#sending invalid JSON', function () {
		it('should return 400', function () {
			var response = hometrack(sample_invalid);
			assert.equal(400, response.status);
		});
	});

	describe('#sending valid JSON', function () {
		var response = hometrack(sample_clean);

		it('should return 200', function () {
			assert.equal(200, response.status)
		});

		it('should contain 2 records', function () {
			assert.equal(2, response.body.response.length)
		});
	});

	describe('#sending valid JSON but missing address', function () {
		var response = hometrack(sample_bad_address);

		it('should return 500', function () {
			assert.equal(500, response.status)
		});
	});

	describe('#address missing building number', function () {
		var response = hometrack(sample_missing_number);

		it('should return 200', function () {
			assert.equal(200, response.status)
		});

		it('have no leading or trailing spaces', function () {
			assert.equal("Donington Ave Georges Hall NSW 2198", response.body.response[0].concataddress);
		});
	});
});