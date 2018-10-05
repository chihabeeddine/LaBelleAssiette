module.exports = (app) => {
    const ingredient = require('../controllers/inventory.js');

    /**
     * Create a new ingredient
     */
    app.post('/ingredient', ingredient.create);

    /**
     * Retrieve all ingredient
     */
    app.get('/ingredient', ingredient.findAll);

    /**
     * Retrieve a single ingredient with ingredientId
     */
    app.get('/ingredient/:ingredientId', ingredient.findOne);

    /**
     * use a name to find an ingredient
     */
    app.get('/ingredient/search/:name', ingredient.findOneByName);

    /**
     * Update a ingredient with ingredientId
     */
    app.put('/ingredient/:ingredientId', ingredient.update);

    /**
     * Delete a ingredient with ingredientId
     */
    app.delete('/ingredient/:ingredientId', ingredient.delete);
}