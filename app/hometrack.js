var _ = require('lodash');

function processRequest(req) {
	var data, response;
	try{
		data = JSON.parse(req);
	} catch(e) {
		return {status:400, body:{error:"Could not decode request: JSON parsing failed"}};
	}
	
	try {
		response = formatData(filterData(data.payload));
	} catch(e){
		return {status:500, body:{error:"Server Error - Sorry for the inconvienience"}};
	}

	return {status:200, body:{response: response}};
}

function filterData(data) {
	return _.filter(data, function(o){
		return o.workflow == "completed" && o.type == "htv";
	});
}

function formatData(data) {
	return _.map(data,function(o) {
		return {
			concataddress: formatAddress(o.address),
			type: o.type,
			workflow: o.workflow
		}
	});
}

function formatAddress(address) {
	var arr = [];
	if(address.buildingNumber) arr.push(address.buildingNumber);
	if(address.street) arr.push(address.street);
	if(address.suburb) arr.push(address.suburb);
	if(address.state) arr.push(address.state);
	if(address.postcode) arr.push(address.postcode);
	return arr.join(" ");
}

module.exports = processRequest;