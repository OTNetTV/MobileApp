/**
 * Load JSON file
 * @param {String} name
 * @param {Function} callback
 */
function loadJsonFile(name, callback) {
  var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/data/' + name + '.json');

  if (file.exists()) {
    var dataSrc = file.read();
    var data = JSON.parse(dataSrc);
    callback(null, data);
    return;
  }

  callback("Error loading JSON file '" + name + "'");
}

/**
   * Data 
   */
var Data = {
  get_config: function (callback) {
    loadJsonFile('config', callback);
  } };


module.exports = Data;