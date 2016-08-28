/**
  https://github.com/mochi/mochikit/blob/master/MochiKit/Async.js
*/
( function() {

  function Defer() {
    this.funcs = new Array();
    this.result = null;

    this.callback = function() { 
      for (var i = 0; i < this.funcs.length ; ++i) {
        this.result = this.funcs[i]( this.result );
      };
    }.bind(this);
  }

  Defer.prototype.addCallback = function( func ) {
    this.funcs.push(func);
  }

  // calllater async
  function callLater( milliseconds ) {
    var d = new Defer();

    d.result = setTimeout(d.callback, milliseconds);
    return d;
  }

  // http request with defer
  function HttpRequest( url, data) {
    this.url = url;
    this.data = data;
    this.d = new Defer();
    this.httpRequest = new XMLHttpRequest();
    this.httpRequest.onreadystatechange = function() {
      if ( this.httpRequest.readyState === XMLHttpRequest.DONE) {
              if ( this.httpRequest.status === 200) {
                this.d.result = this.httpRequest.responseText;
                this.d.callback();
              } else {
                // errorback or something
                console.log('There was a problem with the request.');
              }
            }
    }.bind(this);
  }

  HttpRequest.prototype.formatArgs=function(data) {
    var result = [];
    for( var key in data) {
      result.push(key + "=" + encodeURIComponent(data[key]))
    }
    return result.join("&");
  }

  HttpRequest.prototype.start = function() {
    var args = this.formatArgs( this.data );
    this.httpRequest.open('GET', this.url + "?" + args);
    this.httpRequest.send()
  }

  // request async
  function request(url, data) {
    var hr = new HttpRequest( url, data );
    setTimeout(hr.start.bind(hr), 0); // ==> schedule~

    return hr.d;
  }

  // calllater test
  var d = callLater(1000);
  d.addCallback( function(result) { console.log( "hhhhhhh: " + result ); } );

  // request test
  /*
  var d = request( "/api", {"name": "hanwenfang", "age":28 } );
  d.addCallback( function( result ) { 
    console.log( result ); 
    document.getElementById("content").innerHTML ="From ajax-defer: " + result;
  } );
  */
  document.getElementById("ajax-defer").onclick = function() {
    var d = request( "/api", {"name": "hanwenfang", "age":28 } );
    d.addCallback( function( result ) { 
      console.log( result ); 
      document.getElementById("content").innerHTML ="From ajax-defer: " + result;
    } );
  }
})()
