
exports.handler = async (event, context) => {
    const return_me = {};
    return_me.msg_str = "Report processing, check your phone shortly";
    return return_me;
};

// For local testing
// Uncomment the following lines and run this script to test it locally
// const result = exports.handler(null, null);
// console.log(result);
