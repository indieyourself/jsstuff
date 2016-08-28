/**
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  https://davidwalsh.name/promises
*/
(
  function() {
    function http(url) {
      var core = {
        formatArgs: function(data) {
          var result = [];
          for( var key in data) {
            result.push(key + "=" + encodeURIComponent(data[key]))
          }
          return result.join("&");
        },

        ajax: function( method, url, args ) {
          var self = this;
          self.args = args;

          var promise = new Promise( function(resolve, reject) {
            var client = new XMLHttpRequest();
            var uri = url;
            var args = self.formatArgs(self.args);

            if (method === 'GET') {
              if (args !== "") {
                client.open(method, uri + "?" + args);  
              } else {
                client.open(method, uri);
              }
              client.send();
            } else {
              client.open(method, uri);
              client.send(args);
            }

            client.onload = function() {
              if (this.status >= 200 && this.status < 300) {
                // Performs the function "resolve" when this.status is equal to 2xx
                resolve(this.response);
              } else {
                // Performs the function "reject" when this.status is different than 2xx
                reject(this.statusText);
              }
            };

            client.onerror = function() {
              reject(this.statusText);
            };
          });

          return promise;
        }
      };

      return {
        'get': function(args) {
          return core.ajax('GET', url, args);
        },
        'post': function(args) {
          return core.ajax('POST', url, args);
        },
        'put': function(args) {
          return core.ajax('PUT', url, args);
        },
        'delete': function(args) {
          return core.ajax('DELETE', url, args);
        }
      }
    }

    document.getElementById("ajax-promise").onclick = function() {
      http("/api").get( {"name": "hanwenfang", "age":28 }).then(
        function(data) {
          document.getElementById("content").innerHTML ="From ajax-promise: " + data;
        },

        function(data) {
          document.getElementById("content").innerHTML ="From ajax-promise: error " + data;
        }
      )
    }
  }
)()