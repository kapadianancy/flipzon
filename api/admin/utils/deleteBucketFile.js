const { Storage } = require('@google-cloud/storage');
var path = require('path');

module.exports = async (filepath) => {
    let arrs =  filepath.split("/");
    let filename = arrs[arrs.length-1].split("?")[0];
    // console.log(filename);
    var credPath = path.join(__dirname, '..', '..', 'assets', 'flipzon-key.json');
    storage = await new Storage({
        projectId: "flipzon-4cf32",
        keyFilename: credPath,
    });
    await storage.bucket("gs://flipzon-4cf32.appspot.com/").file(decodeURIComponent(filename)).delete();
}