const cloudinary = require('cloudinary').v2;
const config = require('../config/cloudConfig');

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});

module.exports = {
    async uploader(file) {
        let url = '';
        await cloudinary.uploader.upload(file, (error, result) => {
            if (error) {
                console.log(error);
                return;
            };

            url = result.secure_url;
        });

        return url;
    }
}