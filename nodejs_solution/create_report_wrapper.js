const { Lambda, S3 } = require('aws-sdk');
const childProcess = require('child_process');

const lambda = new Lambda({ region: 'us-east-1' });
const ROLE = 'arn:aws:iam::323811569584:role/LambdaAccessToDynamoDB';

async function createLambdaFunction() {
    try {
        const s3 = new S3();
        const buckets = await s3.listBuckets().promise();
        
        let BUCKET = '';

        for (const bucket of buckets.Buckets) {
            if (bucket.Name.includes('s3bucket')) {
                BUCKET = bucket.Name;
                break;
            }
        }

        if (!BUCKET) {
            throw new Error('S3 bucket not found.');
        }

        const params = {
            FunctionName: 'create_report',
            Runtime: 'nodejs14.x',
            Role: ROLE,
            Handler: 'create_report_code.lambda_handler',
            Code: {
                S3Bucket: BUCKET,
                S3Key: 'create_report_code.zip',
            },
        };

        const response = await lambda.createFunction(params).promise();
        console.log('Lambda function created:', response.FunctionArn);
    } catch (error) {
        console.error('Error creating Lambda function:', error.message);
    }
}

createLambdaFunction();
