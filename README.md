# pythonnodejs-lab7.1
After completing this lab, you should be able to:  Create a Lambda function that queries a DynamoDB database table. Grant sufficient permissions to a Lambda function so that it can read data from DynamoDB. Configure REST API methods to invoke Lambda functions using Amazon API Gateway.
Scenario
The café is eager to launch a dynamic version of their website so that the website can access data stored in a database. Sofía has been making steady progress toward this goal.

In a previous lab, you played the role of Sofía and created a DynamoDB database. The database table contains café menu details, and an index holds menu items that are flagged as specials. Then, in another lab, you created an API to add the ability for the website to receive mock data through REST API calls.

![image](https://github.com/jipx/pythonnodejs-lab7.1/assets/4178277/83de71c4-a9bb-4e43-91fc-7ec2d3efaaad)
By the end of this lab, you will have created Lambda functions that the API will invoke. At that point, your account resources and configurations will look like the following diagram:
![image](https://github.com/jipx/pythonnodejs-lab7.1/assets/4178277/a553b0db-fbef-4b00-a3ce-9c9abeb43ea9)
