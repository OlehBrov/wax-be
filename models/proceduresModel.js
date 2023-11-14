const { Schema, model } = require("mongoose");

const proceduresSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    duration: {type: Number}

})

module.exports = model("procedure", proceduresSchema);