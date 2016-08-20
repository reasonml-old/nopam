var path = require('path');
var fs = require('fs');
var curDir = process.argv.slice(2)[0];

function trueVariable() {
    return {
        "global": true,
        "globalCollisionBehavior": "clobber",
        "val": "true"
    }
}

function enableVariable() {
    return {
        "global": true,
        "globalCollisionBehavior": "clobber",
        "val": "enable"
    }
}
function injectEnvs(filename) {
    console.log(filename)
    var pkg = JSON.parse(
        fs.readFileSync(filename, 'utf8')
    );
    name = pkg["name"].replace(/-/g, "_");
    if (pkg["exportedEnvVars"] == undefined) {
        pkg["exportedEnvVars"] = {};
    }
    pkg["exportedEnvVars"][name + "_installed"] = trueVariable();
    pkg["exportedEnvVars"][name + "_enable"] = enableVariable();
    fs.writeFileSync(filename, JSON.stringify(pkg, null, 2))
}


injectEnvs(path.join(curDir, 'package.json'));
