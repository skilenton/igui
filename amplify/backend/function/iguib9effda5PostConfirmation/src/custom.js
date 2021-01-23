const AWS = require('aws-sdk');
let documentClient = new AWS.DynamoDB.DocumentClient({region:'ap-southeast-1'});

exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  
  callback(null, event);
};
