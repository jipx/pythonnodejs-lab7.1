const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({ region: 'us-east-1' });

const ROLE = 'arn:aws:iam::323811569584:role/LambdaAccessToDynamoDB';
const BUCKET = 'YOUR_BUCKET_NAME'; // Replace with your S3 bucket name

const params = {
    FunctionName: 'create_report',
    Runtime: 'nodejs14.x',
    Role: ROLE,
    Handler: 'index.handler',
    Code: {
        S3Bucket: BUCKET,
        S3Key: 'create_report_code.zip',
    },
};

lambda.createFunction(params, (err, data) => {
    if (err) {
        console.error('Error creating Lambda function:', err);
    } else {
        console.log('Lambda function created:', data);
    }
});
