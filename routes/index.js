	var express = require('express');
	var router = express.Router();
	var request = require('sync-request');
	data = "";
	issue_array=[];
	var page=1;
	var request_execeuted=0;
	var no_issues_mod100=0;
	/* GET home page. */
	
	console.log("0");

	router.get('/', function(req, res, next) {
		while(data.length%100==0 && no_issues_mod100==0){
			//console.log(data.length);
			var options = { 
				//url: 'https://api.github.com/repos/shippable/support/issues?client_id=58161dcf40849abffecd&client_secret=10ee9d2f6a2402cdca283d8b2ba01529bb216475&page='+page+'&per_page=100',
				headers: {
				'User-Agent': 'funapp'
				}
			};
			var data_json=request('GET','https://api.github.com/repos/shippable/support/issues?client_id=58161dcf40849abffecd&client_secret=10ee9d2f6a2402cdca283d8b2ba01529bb216475&state=all&page='+page+'&per_page=100',options);
			/*request(options, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					console.log("2");
					data = JSON.parse(body);
					request_execeuted=1;					
					if(data.length==0){
						console.log("3");
						no_issues_mod100=1;
					}
				} else {
	  				console.log(error); 
	  			}
	  			for(i=0;i<data.length;i++){
	  				issue_array.push(data[i].title);
	  			}			
			})
			page++;
		}*/
		//setTimeout(load(res),1000);
			data=JSON.parse(data_json.getBody());
			for(i=0;i<data.length;i++){
	  			issue_array.push(data[i].title);
	  		}
	  		if(data.length==0){
				console.log("3");
				no_issues_mod100=1;
			}
	  		page++;
	  	}
		//if(request_execeuted==1){
			load(res);
			issue_array=[];
			
		//}
		
	 	 			
	});

	module.exports = router;


	function load(res) {

		res.render('index', { title: data });
		console.log("4");

	}