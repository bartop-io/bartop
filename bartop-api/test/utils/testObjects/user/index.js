const user0 = {
  auth0Id: 'marvin@gmail.com|7984284578419749',
  catalog: []
};

const user1 = {
  auth0Id: 'megan@yahooanswers.com|1988284318489743',
  catalog: []
};

const user2 = {
  auth0Id: 'bilbo@bartopbadboi.io|5467945134679452',
  catalog: []
};

const user3 = {
  auth0Id: 'billyd@ufl.edu|9164372819546791',
  catalog: []
};

const user4 = {
  auth0Id: 'peteforpres@midearth.com|2461849122549183',
  catalog: []
};

// testUser is for controller and grapql create user
module.exports.testUser = user0;
// postUser is a user object to test POSTing
module.exports.postUser = user1;
module.exports.list = [user2, user3];
// catalogUser is for getting a user by id with a catalog
module.exports.catalogUser = user4;
