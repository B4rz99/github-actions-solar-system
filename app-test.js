const mongoose = require("mongoose");
const server = require("./app");
const chai = require("chai");
const chaiHttp = require("chai-http");

// Assertion setup
chai.should();
chai.use(chaiHttp);

// Get the model
const planetModel = mongoose.model('planets');

before(async () => {
    // Clear the test DB and seed it
    await planetModel.deleteMany({});
    await planetModel.insertMany([
        { id: 1, name: 'Mercury', description: '', image: '', velocity: '', distance: '' },
        { id: 2, name: 'Venus', description: '', image: '', velocity: '', distance: '' },
        { id: 3, name: 'Earth', description: '', image: '', velocity: '', distance: '' },
        { id: 4, name: 'Mars', description: '', image: '', velocity: '', distance: '' },
        { id: 5, name: 'Jupiter', description: '', image: '', velocity: '', distance: '' },
        { id: 6, name: 'Saturn', description: '', image: '', velocity: '', distance: '' },
        { id: 7, name: 'Uranus', description: '', image: '', velocity: '', distance: '' },
        { id: 8, name: 'Neptune', description: '', image: '', velocity: '', distance: '' },
        { id: 9, name: 'Pluto', description: '', image: '', velocity: '', distance: '' }
    ]);
});

after(() => {
    mongoose.connection.close();
});

describe('Planets API Suite', () => {

    describe('Fetching Planet Details', () => {
        it('should fetch a planet named Mercury', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 1 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(1);
                    res.body.should.have.property('name').eql('Mercury');
                    done();
                });
        });

        it('should fetch a planet named Venus', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 2 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(2);
                    res.body.should.have.property('name').eql('Venus');
                    done();
                });
        });

        it('should fetch a planet named Earth', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 3 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(3);
                    res.body.should.have.property('name').eql('Earth');
                    done();
                });
        });

        it('should fetch a planet named Mars', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 4 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(4);
                    res.body.should.have.property('name').eql('Mars');
                    done();
                });
        });

        it('should fetch a planet named Jupiter', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 5 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(5);
                    res.body.should.have.property('name').eql('Jupiter');
                    done();
                });
        });

        it('should fetch a planet named Saturn', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 6 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(6);
                    res.body.should.have.property('name').eql('Saturn');
                    done();
                });
        });

        it('should fetch a planet named Uranus', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 7 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(7);
                    res.body.should.have.property('name').eql('Uranus');
                    done();
                });
        });

        it('should fetch a planet named Neptune', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 8 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(8);
                    res.body.should.have.property('name').eql('Neptune');
                    done();
                });
        });

        it('should fetch a planet named Pluto', (done) => {
            chai.request(server)
                .post('/planet')
                .send({ id: 9 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('id').eql(9);
                    res.body.should.have.property('name').eql('Pluto');
                    done();
                });
        });
    });
});

describe('Testing Other Endpoints', () => {

    it('should fetch OS details', (done) => {
        chai.request(server)
            .get('/os')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('os');
                done();
            });
    });

    it('should return live status', (done) => {
        chai.request(server)
            .get('/live')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('live');
                done();
            });
    });

    it('should return ready status', (done) => {
        chai.request(server)
            .get('/ready')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('ready');
                done();
            });
    });

});
