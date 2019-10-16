/*
 * Api calls
 * $params url, callback
 */
exports.getService = function (params, _callback) {

  console.log("getService", JSON.stringify(params));

  var xhr = Ti.Network.createHTTPClient({
    onload: function (e) {

      _callback(JSON.parse(this.responseText));

    },
    onerror: function (e) {

      _callback({
        status: false,
        message: this.responseText });


    },
    timeout: 15000 /* in milliseconds */ });


  xhr.open("GET", Alloy.Globals.apiUrl + params.endpoint);
  xhr.setRequestHeader('X-API-KEY', Alloy.Globals.apiKey);
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('Cache-Control', 'no-store');
  xhr.send();

};

/*
    * Api calls
    * $params url, callback
    */
exports.postService = function (params, _callback) {

  console.log("postService", JSON.stringify(params));

  var xhr = Ti.Network.createHTTPClient({
    onload: function (e) {

      _callback(JSON.parse(this.responseText));

    },
    onerror: function (e) {

      _callback({
        status: false,
        message: this.responseText });


    },
    timeout: 5000 /* in milliseconds */ });


  xhr.open("POST", Alloy.Globals.apiUrl + params.endpoint);
  xhr.setRequestHeader('X-API-KEY', Alloy.Globals.apiKey);
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('Cache-Control', 'no-store');
  xhr.send(params);

};

/*
    * Api calls
    * $params url, callback
    */
exports.getCustomerService = function (params, _callback) {

  console.log("getCustomerService", JSON.stringify(params));

  var xhr = Ti.Network.createHTTPClient({
    onload: function (e) {

      _callback(JSON.parse(this.responseText));

    },
    onerror: function (e) {

      _callback({
        status: false,
        message: this.responseText });


    },
    timeout: 5000 /* in milliseconds */ });


  console.log(Alloy.Globals.apiUrl + params.endpoint);
  xhr.open("GET", Alloy.Globals.apiUrl + params.endpoint);
  console.log('Bearer ' + Ti.App.Properties.getString('token') + '');
  xhr.setRequestHeader('Authorization', 'Bearer ' + Ti.App.Properties.getString('token') + '');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('Cache-Control', 'no-store');
  xhr.send();

};

/*
    * Api calls
    * $params url, callback
    */
exports.postCustomerService = function (params, _callback) {

  console.log("postSecureService", JSON.stringify(params));

  var xhr = Ti.Network.createHTTPClient({
    onload: function (e) {

      _callback(JSON.parse(this.responseText));

    },
    onerror: function (e) {

      _callback({
        status: false,
        message: this.responseText });


    },
    timeout: 5000 /* in milliseconds */ });


  console.log(Alloy.Globals.apiUrl + params.endpoint);
  xhr.open("POST", Alloy.Globals.apiUrl + params.endpoint);
  console.log('Bearer ' + Ti.App.Properties.getString('token') + '');
  xhr.setRequestHeader('Authorization', 'Bearer ' + Ti.App.Properties.getString('token') + '');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  xhr.setRequestHeader('Cache-Control', 'no-store');
  xhr.send(params);

};