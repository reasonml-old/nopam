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
function injectEnvs(filename) {
    console.log(filename)
    var pkg = JSON.parse(
        fs.readFileSync(filename, 'utf8')
    );
    name = pkg["name"].replace("-", "_");
    if (pkg["exportedEnvVars"] == undefined) {
        pkg["exportedEnvVars"] = {};
    }
    pkg["exportedEnvVars"][name + "_installed"] = trueVariable();
    pkg["exportedEnvVars"][name + "_enable"] = trueVariable();
    fs.writeFileSync(filename, JSON.stringify(pkg, null, 2))
}


injectEnvs(path.join(curDir, 'package.json'));
