const { Storage } = require('@google-cloud/storage');
var path = require('path');
const resizeImg = require('resize-image-buffer');
let storage,bucket;

module.exports = async (req,res,next) => {
    if(req.files) {
        var credPath = path.join(__dirname, '..', '..', '..','flipzon-key.json');
        console.log(credPath);
        storage = await new Storage({
            projectId: "flipzon-4cf32",
            keyFilename: credPath,
        });
        bucket = await storage.bucket("gs://flipzon-4cf32.appspot.com/");

        let imgs = {};
        try {
            if(req.files.image && req.files.image.length > 0) {
                imgs.image = await uploadAndThumbImage(req.files.image[0]);
            }
            if(req.files.images && req.files.images.length > 0) {
                imgs.images = await Promise.all( req.files.images.map( image => uploadAndThumbImage(image) ));
            }
            req.images = {...imgs};
            next();
        } catch (error) {
            console.log(error);
            next();
        }
    }
}

const uploadAndThumbImage = async ({ originalname, mimetype, buffer }) => {
    let imgs = await Promise.all([
        uploadImage({ originalname, mimetype, buffer }),
        uploadImage({ originalname, mimetype, buffer, isThumb:true })
    ])
    return imgs;
}

const uploadImage = async ({ originalname, mimetype, buffer, isThumb = false }) => {
    return new Promise( async (resolve,reject) => {
        if(isThumb) {
            originalname = originalname.split(".")[0]+"@64x64.png";
            buffer = await resizeImg(buffer, {
                width: 64,
                height: 64,
            })
        }
        const blob = await bucket.file(originalname);
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: mimetype,
            },
        });
        blobWriter.on('error', (err) => reject(err));
        blobWriter.on('finish', () => {
            // console.log(blob, blobWriter);
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${encodeURI(blob.name)}?alt=media`;
            resolve(publicUrl);
        });
        await blobWriter.end(buffer);
    })
}