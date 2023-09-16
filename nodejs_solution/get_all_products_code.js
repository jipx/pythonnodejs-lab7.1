const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const TABLE_NAME_STR = 'FoodProducts';
const INDEX_NAME_STR = 'special_GSI';

async function scanTable() {
  console.log('Running scan on table');
  const params = {
    TableName: TABLE_NAME_STR,
  };

  try {
    let data = [];
    do {
      const response = await dynamodb.scan(params).promise();
      data = data.concat(response.Items);

      if (response.LastEvaluatedKey) {
        params.ExclusiveStartKey = response.LastEvaluatedKey;
      } else {
        break;
      }
    } while (true);

    const transformedData = data.map((item) => ({
      product_item_arr: {
        product_name_str: item.product_name,
        product_id_str: item.product_id,
        price_in_cents_int: item.price_in_cents ? parseInt(item.price_in_cents) : null,
        description_str: item.description,
        tag_str_arr: item.tags,
        special_int: item.special !== undefined ? parseInt(item.special) : null,
      },
    }));

    return transformedData;
  } catch (error) {
    console.error('Error scanning table:', error);
    throw error;
  }
}

async function scanIndex() {
  console.log('Running scan on index');
  const params = {
    TableName: TABLE_NAME_STR,
    IndexName: INDEX_NAME_STR,
    FilterExpression: 'NOT contains(tags, :value)',
    ExpressionAttributeValues: {
      ':value': 'out of stock',
    },
  };

  try {
    let data = [];
    do {
      const response = await dynamodb.scan(params).promise();
      data = data.concat(response.Items);

      if (response.LastEvaluatedKey) {
        params.ExclusiveStartKey = response.LastEvaluatedKey;
      } else {
        break;
      }
    } while (true);

    const transformedData = data.map((item) => ({
      product_item_arr: {
        product_name_str: item.product_name,
        product_id_str: item.product_id,
        price_in_cents_int: item.price_in_cents ? parseInt(item.price_in_cents) : null,
        description_str: item.description,
        tag_str_arr: item.tags,
        special_int: item.special !== undefined ? parseInt(item.special) : null,
      },
    }));

    return transformedData;
  } catch (error) {
    console.error('Error scanning index:', error);
    throw error;
  }
}

exports.handler = async (event, context) => {
  const offerPathStr = event.path;
  if (offerPathStr) {
    return scanIndex();
  } else {
    return scanTable();
  }
};
