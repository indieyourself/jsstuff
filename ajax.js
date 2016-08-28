/**
https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started

*/
(
	function() {
		var httpRequest;
		
		function formatArgs(data) {
			var result = [];
			for( var key in data) {
				result.push(key + "=" + encodeURIComponent(data[key]))
			}
			return result.join("&");
		}

		function request(url, data) {
			httpRequest = new XMLHttpRequest();

			if (!httpRequest) {
				console.log("ajax-json httpRequest error");
			};

			httpRequest.onreadystatechange = function() {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
      					if (httpRequest.status === 200) {
        					document.getElementById("content").innerHTML = httpRequest.responseText;
	      				} else {
	        				console.log('There was a problem with the request.');
	      				}
	      			}
			}

			var args = formatArgs(data);
			httpRequest.open('GET', url + "?" + args);
			httpRequest.send()
		}

		function requestForm(url, data) {

			httpRequest = new XMLHttpRequest();

			if (!httpRequest) {
				console.log("ajax-json httpRequest error");
			};

			httpRequest.onreadystatechange = function() {
				if (httpRequest.readyState === XMLHttpRequest.DONE) {
      					if (httpRequest.status === 200) {
        					document.getElementById("content").innerHTML = httpRequest.responseText;
	      				} else {
	        				console.log('Error: ' + httpRequest.responseText);
	      				}
	      			}
			}

			args = formatArgs(data);
			httpRequest.open('POST', url );
			httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			httpRequest.send(args);
		}

		document.getElementById("ajax").onclick = function() {
			console.log("ajax");
			//request("/api", {"name": "hanwenfang", "age":28 });
			requestForm("/api", {"name": "hanwenfang", "age":28 });
		}

	}
)()