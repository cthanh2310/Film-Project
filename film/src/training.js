var jwt = require('jsonwebtoken');
var fs = require('fs')
var s = require('../src/key/private.pem')
var privateKey = fs.readFileSync(s);
var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
console.log(token)
// console.log(jwt.sign(data, 'nodemy12345'));
// jwt.sign(data, 'nodemy12345',{
//     expiresIn: 1 * 60 * 60
// }, function(error, data){
//     console.log('data: ' + data);
// });

// var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vZGVteSIsImlhdCI6MTYyMDc4NDI4MH0.kTYUPDTOGuVnl3JH1PXmSsMf_4IUBZxmOPLsEvk0inQ';

// var ketqua = jwt.verify(token, 'nodemy12345');
// console.log(ketqua);

// var result = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vZGVteSIsImlhdCI6MTYyMDc4NTI0MSwiZXhwIjoxNjIwNzg1MjcxfQ.hyq3rPOfRrVe6vBKAEjMwzWYvNoWo5sk9aFQGnUtz9g', 'nodemy12345');
// console.log(result);
// token = header.payload.signature 

// node film/src/training.js

// data + secret (sign) => token
// token + secret (verify) => data    