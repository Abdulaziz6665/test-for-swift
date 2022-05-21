const path = require('path');
const fs = require('fs')
const {promisify} = require('util')

const writeFile = promisify(fs.writeFile);
const unLinkFile = promisify(fs.unlink)

const appPath = function (pathName) {
	return path.join(path.dirname(__dirname), '../', pathName)
}


module.exports = {
    appPath,
    writeFile,
    unLinkFile
}