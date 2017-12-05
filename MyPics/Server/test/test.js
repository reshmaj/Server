var mongoose = require("mongoose");
var User = require('../app/models/users');
var Mypic = require('../app/models/mypics');
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);
describe('User', () => {
	beforeEach((done) => { 
		User.remove({}, (err) => {
			done();
		});
	});
	it('it should POST a user', (done) => {
		var user = {
			"firstName": "Jane",
			"lastName": "Doe",
			"email": "woo@hoo.com",
			"password": "pass"
		}
		chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.have.property('firstName');
				res.body.firstName.should.be.a('string');
				res.body.firstName.should.equal('Jane');
				done();
			});
	});
	it('it should not POST a user without email field', (done) => {
		var user = {
			"firstName": "Jane",
			"lastName": "Doe",
			"password": "pass"
		}
		chai.request(server)
			.post('/api/users')
			.send(user)
			.end((err, res) => {
				res.should.have.status(500);
				done();
			});
	});
	    it('it should GET all the users', (done) => {
		        var user = new User({
		            "firstName": "Jane",
		            "lastName": "Doe",
		            "email": "JaneDoe@hoo.com",
		            "password": "pass"
		        });
		        user.save((err, user) => {
		            chai.request(server)
		                .get('/api/users')
		                .end((err, res) => {
		                    res.should.have.status(200);
		                    res.body.should.be.a('array');
		                    res.body.length.should.be.eql(1);
		                    done();
		                });
		    
		        });
		    });
		it('it should GET a user by the given id', (done) => {
			var user = new User({
		            		"firstName": "Jane",
		            		"lastName": "Doe",
		            		"email": "JaneDoe@hoo.com",
		            		"password": "pass"
		        	});
		
			user.save((err, user) => {
				chai.request(server)
					.get('/api/users/' + user._id)
					.send(user)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('firstName');
						res.body.should.have.property('lastName');
						res.body.should.have.property('email');
						res.body.should.have.property('password');
						res.body.should.have.property('_id').eql(user._id.toString());
						done();
					});
				});
		
			});
			    it('it should UPDATE a user', (done) => {
				        
				        var user = new User({
				            "firstName": "Jane",
				            "lastName": "Doe",
				            "email": "yoo@hoo.com",
				            "password": "pass"
				        });
				        user.save((err, user) => {
				                chai.request(server)
				                .put('/api/users/' + user._id)
				                .send({
				                    "_id": user._id,
				                    "firstName": "Joey",
				                    "lastName": "Doe",
				                    "email": "yoo@hoo.edu",
				                    "password": "pass"
				                    })
				  .end((err, res) => {
					                    res.should.have.status(200);
					                    res.body.should.be.a('object');
					                    res.body.should.have.property('email').eql('yoo@hoo.edu');
					                    res.body.should.have.property('firstName').eql('Joey');
					                    done();
					                });
					        });
					    });
					it('it should DELETE a user given the id', (done) => {
						var user = new User({
							"firstName": "Jane",
							"lastName": "Doe",
							"email": "five@hoo.com",
							"password": "pass"
						});
						user.save((err, user) => {
								chai.request(server)
								.delete('/api/users/' + user.id)
								.end((err, res) => {
						res.should.have.status(200);
						  done();
								});
						  });
			  });
});
describe('mypic', () => {
	    beforeEach((done) => { 
		       Mypic.remove({}, (err) => {
	            done();
	        });
	    });
	   var user = new User({
		        "firstName": "Chris12",
		        "lastName": "Doem2",
		        "email": "ChrisDoem12@hoo.com",
		        "password": "passwor"
	    });
	    user.save((err, user) => {
	        USER_ID = user._id;
	    });
	it('it should POST a mypic', (done) => {
		        var mypic = {
		            "userId": USER_ID,
		            "mypic": "This is my mypic",
					
		          }       
		        chai.request(server)
		            .post('/api/mypics')
		            .send(mypic)
		            .end((err, res) => {            
		                res.should.have.status(201);
		                res.body.should.have.property('mypic');
		                res.body.mypic.should.be.a('string');
		                res.body.mypic.should.equal('This is my Mypic');
		                done();
		            });
		    });
		it('it should GET a users mypics', (done) => {
			        var mypic = new Mypic({
			            "userId": USER_ID,
			            "mypic": "This is my mypic",
					//	"description":"alskdfj"

			        })
			        mypic.save((err, mypic) => {      
			            chai.request(server)
			                .get('/api/mypics/user/' + USER_ID)
			                .end((err, res) => {            
			                    res.should.have.status(200);
			                    res.body.should.be.a('array');
			                    res.body.length.should.be.eql(1);
			                    done();
			                });
			        });
			    });
			    it('it should GET a mypic', (done) => {
				        var mypic = new Mypic({
				            "userId": USER_ID,
				            "mypic": "This is my mypic",
				           // "description":"alskdfj"
				        })
				        mypic.save((err, mypic) => {      
				            chai.request(server)
				                .get('/api/mypics/' + mypic._id)
				                .end((err, res) => {            
				                    res.should.have.status(200);
				                    res.body.should.be.a('object');
				                    res.body.should.have.property('userId');
				                    res.body.should.have.property('mypic');
				                  //  res.body.should.have.property('completed');
				                    res.body.should.have.property('dateCreated');
				                    res.body.should.have.property('_id').eql(mypic._id.toString());
				                    done();
				                });
				        });
				    });
				    it('it should UPDATE a mypic', (done) => {
					        
					        var mypic = new Mypic({
					            "userId": USER_ID,
					            "mypic": "This is my Mypic",
					           // "description": "This is a description"
					        })
					mypic.save((err, mypic) => {
						                chai.request(server)
						                .put('/api/mypics/' + mypic._id)
						                .send({
						                    "_id": mypic._id,
						                    "userId": USER_ID,
						                    "mypic": "Get it done!",
						                   "description": "I don't need a description",
						                    })
						                .end((err, res) => {
						                    res.should.have.status(200);
						                    res.body.should.be.a('object');
						                    res.body.should.have.property('mypic').eql('Get it done!');
						                   res.body.should.have.property('description').eql("I don't need a description");
						                    done();
						                });
						        });
						    }); 
it('it should DELETE a mypic given the id', (done) => {
        var mypic = new Mypic({
            "userId": USER_ID,
            "mypic": "This is my Mypic",
          //  "description": "This is a description"
        })
        mypic.save((err, mypic) => {
	chai.request(server)
	.delete('/api/mypics/' + mypic.id)
	.end((err, res) => {
		res.should.have.status(200);
                   	done();
	});
         });
    });
																				
	});
	

//});

describe('Test', function() {
	
	it('it should GET the index.html file', (done) => {
		chai.request(server)
			.get('/index.html')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.be.html;
			done();
			});
	});
	
   it('it should return 404', (done) => {
	  chai.request(server)		
	  .get('/index2.html')
		   .end((err, res) => {
			   res.should.have.status(404);
		   done();
		   });
   });
  
  });
