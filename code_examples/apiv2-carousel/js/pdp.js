$(document).ready(function() {
	
});

  const olapicExamples = function() {
    // this.options = {
    //  prodId: ''
    // };

    // var _this = this;


		/**************** PDP widget *********************/

		// Find Olapic Script to extract data-tags value

		// var initialize = function(){
		// 	var oScripts = document.getElementsByTagName('script');
		//     for(x=0; x<oScripts.length; x++){

		//         // Is it an Olapic script?
		//         var dataOlapic = oScripts[x].getAttribute('data-olapic');
		//         if( dataOlapic !== null && dataOlapic !== undefined ){
		//         	console.log(_this);
		//         	_this.options.prodId = oScripts[x].getAttribute('data-tags');
		//         	break;
		//         }
		//     };
		// };

		// 	// Search for specific Stream using Product Unique ID

		// var searchStream = function(){
		// 	var defer = $.Deferred();

		// 	$.ajax({
		// 		dataType: "json",
		// 		url: "https://photorankapi-a.akamaihd.net/customers/218282/streams/search?tag_key=" + _this.options.prodId + "&auth_token=4fede0cc6c796e4ea829f86a896236bfca8aaee28a803daf2770e3dda82dc19c&version=v2.2",
		// 		type: "GET",
		// 		data: {
		// 			format: "json"
		// 		},
		// 		success: function(data) {
		// 			defer.resolve(data);
		// 		},
		// 		error: function(error){
		// 			defer.reject(error);
		// 		}
		// 	});

		// 	return defer;
		// };

		// 	//Get the media Object from Stream

		// var getMediaFromStreamLink = function(streamLink){
		// 	var defer = $.Deferred();

		// 	$.ajax({
		// 		dataType: "json",
		// 		url: streamLink,
		// 		type: "GET",
		// 		data: {
		// 			format: "json"
		// 		},
		// 		success: function(data) {
		// 			defer.resolve(data);
		// 		},
		// 		error: function(error){
		// 			defer.reject(error);
		// 		}
		// 	});

		// 	return defer;
		// };

		// initialize();
		// searchStream()
		// 	.then(function(data){
		// 		return getMediaFromStreamLink(data.data._embedded['media:recent']._links.self.href);
		// 	});

		/***************** END PDP  *******************/

		 window.olapicAPIExamples = new olapicExamples();