const Inventory = require('../models/inventory.js');

/**
 * Create and Save a new ingredient
 * @param req
 * @param res
 * @returns {*}
 */
exports.create = (req, res) => {

    if (!req.body.name && !req.body.quantities && !req.body.unit) {
        return res.status(400).send({
            message: "to create a ingredient you need a name, quantities and a unit"
        });
    }


    const inventory = new Inventory({
        name: req.body.name,
        quantities: req.body.quantities,
        unit: req.body.unit
    });


    inventory.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a new ingredient."
        });
    });

};

/**
 * Retrieve and return all ingredients from the database.
 * @param req
 * @param res
 *
 */
exports.findAll = (req, res) => {
    Inventory.find()
        .then(ingredients => {
            res.status(200).send(ingredients);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ingredients."
        });
    });
};


/**
 * Find a single ingredient with a id
 * @param req
 * @param res
 */
exports.findOne = (req, res) => {
    Inventory.findOne({
        "_id": req.params.ingredientId
    }).then(ingredient => {
        if (!ingredient) {
            return res.status(404).send({
                message: "ingredient not found with id " + req.params.ingredientId
            });
        }
        res.status(200).send(ingredient);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ingredient not found with id " + req.params.ingredientId
            });
        }
        return res.status(500).send({
            message: "Error retrieving ingredient with id " + req.params.ingredientId
        });
    });
};

/**
 * Find a single ingredient with a name
 * @param req
 * @param res
 */
exports.findOneByName = (req, res) => {
    Inventory.findOne({
        "name": req.params.name
    }).then(ingredient => {
            if (!ingredient) {
                return res.status(404).send({
                    message: "ingredient not found with name " + req.params.name
                });
            }
            res.status(200).send(ingredient);
        }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving ingredient with name " + req.params.name
        });
    });
};

/**
 * Update a ingredient identified by the Id in the request
 * @param req
 * @param res
 * @returns {*}
 */
exports.update = (req, res) => {
    if (!req.body.name && !req.body.quantities && !req.body.unit) {
        return res.status(400).send({
            message: "to create a ingredient you need a name, quantities and a unit"
        });
    }
    Inventory.findOneAndUpdate(req.params.ingredientId, {
        name: req.body.name,
        quantities: req.body.quantities,
        unit: req.body.unit,
    }, {useFindAndModify: false})
        .then(ingredient => {
            if (!ingredient) {
                return res.status(404).send({
                    message: "ingredient not found with id " + req.params.ingredientId
                });
            }
            res.status(200).send(ingredient);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ingredient not found with id " + req.params.ingredientId
            });
        }
        return res.status(500).send({
            message: "Error updating ingredient with id " + req.params.ingredientId
        });
    });
};

/**
 * Delete a ingredient with the specified id in the request
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    Inventory.findOneAndDelete(req.params.ingredientId)
        .then(ingredient => {
            if (!ingredient) {
                return res.status(404).send({
                    message: "ingredient not found with id " + req.params.ingredientId
                });
            }
            res.status(200).send({message: "ingredient deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ingredient not found with id " + req.params.ingredientId
            });
        }
        return res.status(500).send({
            message: "Could not delete ingredient with id " + req.params.ingredientId
        });
    });
};