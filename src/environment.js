var environment = {};
var fs = require('fs');

/**
 * @author Victor Axelsson
 * Reads the env.json file in the root, sync, and returnes the parsed as parsed object
 */
environment.getEnvironment = function() {
    var json = fs.readFileSync('env.json', 'utf8');
    return JSON.parse(json);
}

/**
 * @author Victor Axelsson
 * Reads the env.json file in the root, async, and returnes the parsed as parsed object
 */
environment.getEnvironmentAsync = function(callback) {
    fs.readFile('env.json', 'utf8', function(err, content) {
        callback(err, JSON.parse(content));
    });
}

module.exports = environment;
