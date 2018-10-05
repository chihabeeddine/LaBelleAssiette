const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    name: String,
    quantities: Number,
    unit: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Inventory', InventorySchema);