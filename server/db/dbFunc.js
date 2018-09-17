// const db = require('./connection');
// const hash = require('../auth/hash');

// function exampleDbFunction() {
//   return db('users');
// }

// function userExists(username, conn) {
//   //const db = conn || connection;
//   console.log(username);

//   return db('users')
//     .count('id as n')
//     .where('username', username)
//     .then(count => {
//       console.log(count);
//       return count[0].n > 0;
//     });
// }

// function createUser(username, password, conn) {
//   const passwordHash = hash.generate(password);
//   // const db = conn || connection
//   return db('users').insert({ username, hash: passwordHash });
// }

// function getUserByName(username, conn) {
//   // const db = conn || connection
//   return db('users')
//     .select()
//     .where('username', username)
//     .first();
// }

// module.exports = {
//   exampleDbFunction,
//   userExists,
//   createUser,
//   getUserByName
// };