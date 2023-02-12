

const dbValidator = require('./db-validator');
const fileUpload = require('./file-Upload');
const generarJWT = require('./generarJWT');
const googleTokenValidator = require('./googleToken-validator');

module.exports = {
    ...dbValidator,
    ...fileUpload,
    ...generarJWT,
    ...googleTokenValidator,
}