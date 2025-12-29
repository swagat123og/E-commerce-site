const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    email: String,
    panelcolor: String,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    textcolor: String,
    price: Number,

    // 🔥 IMPORTANT CHANGE
    image: Buffer
});

module.exports = mongoose.model('product', productSchema);
