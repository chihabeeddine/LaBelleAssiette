process.env.NODE_ENV = 'test';


let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require("mongoose");
let server = require('../server');
let Inventory = require('../app/models/inventory');

const INGREDIENT_ID = "5bb72cac1a4d5e2576fee897";
const NAME = "orange";

var should = chai.should()
chai.use(chaiHttp);

describe('Server', function () {

    beforeEach(function (done) {
        var newIngredient = new Inventory({
            "_id": INGREDIENT_ID,
            "name": "orange",
            "quantities": 2,
            "unit": "none"
        });
        newIngredient.save(done);
    });
    describe('Ingredients', function () {
        it('should list all ingredients on /ingredient GET', (done) => {
            chai.request(server)
                .get('/ingredient')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[0].should.have.property('_id');
                    res.body[0]._id.should.be.a('string');
                    res.body[0].should.have.property('name');
                    res.body[0].name.should.be.a('string');
                    res.body[0].should.have.property('quantities');
                    res.body[0].quantities.should.be.a('number');
                    res.body[0].should.have.property('unit');
                    res.body[0].unit.should.be.a('string');

                    done();
                });

        });

        it('should create a new ingredient on /ingredient POST', (done) => {
            chai.request(server)
                .post('/ingredient')
                .send(({"name": "kiwi", "quantities": 1, "unit": "none"}))
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('_id');
                    res.body._id.should.be.a('string');
                    res.body.should.have.property('name');
                    res.body.name.should.be.a('string');
                    res.body.name.should.equal('kiwi');
                    res.body.should.have.property('quantities');
                    res.body.quantities.should.be.a('number');
                    res.body.quantities.should.equal(1);
                    res.body.should.have.property('unit');
                    res.body.unit.should.be.a('string');
                    res.body.unit.should.equal('none');
                    done();
                });

        });

        it('should get a single ingredient on /ingredient/:ingredientId GET', (done) => {
            chai.request(server)
                .get(`/ingredient/${INGREDIENT_ID}`)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('_id');
                    res.body._id.should.be.a('string');
                    res.body.should.have.property('name');
                    res.body.name.should.be.a('string');
                    res.body.name.should.equal('orange');
                    res.body.should.have.property('quantities');
                    res.body.quantities.should.be.a('number');
                    res.body.quantities.should.equal(2);
                    res.body.should.have.property('unit');
                    res.body.unit.should.be.a('string');
                    res.body.unit.should.equal('none');
                    done();
                });

        });

        it('should get a single ingredient on /ingredient/search/:name GET', (done) => {
            chai.request(server)
                .get(`/ingredient/search/${NAME}`)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('_id');
                    res.body._id.should.be.a('string');
                    res.body.should.have.property('name');
                    res.body.name.should.be.a('string');
                    res.body.name.should.equal('orange');
                    res.body.should.have.property('quantities');
                    res.body.quantities.should.be.a('number');
                    res.body.quantities.should.equal(2);
                    res.body.should.have.property('unit');
                    res.body.unit.should.be.a('string');
                    res.body.unit.should.equal('none');

                    done();
                });

        });

        it('should update an ingredient on /ingredient/:ingredientId PUT', (done) => {
            chai.request(server)
                .put(`/ingredient/${INGREDIENT_ID}`)
                .send(({"name": "banana", "quantities": 4, "unit": "none"}))
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('_id');
                    res.body._id.should.be.a('string');
                    res.body.should.have.property('name');
                    res.body.name.should.be.a('string');
                    res.body.name.should.equal('orange');
                    res.body.should.have.property('quantities');
                    res.body.quantities.should.be.a('number');
                    res.body.quantities.should.equal(2);
                    res.body.should.have.property('unit');
                    res.body.unit.should.be.a('string');
                    res.body.unit.should.equal('none');


                    done();
                });

        });

        it('should delete an single ingredient on /ingredient/:ingredientId', (done) => {
            chai.request(server)
                .delete(`/ingredient/${INGREDIENT_ID}`)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message');
                    res.body.message.should.equal('ingredient deleted successfully!');
                    done();
                });

        });

    });

    // afterEach drop
    afterEach(function (done) {
        mongoose.connection.db.dropDatabase(done);
    })


});