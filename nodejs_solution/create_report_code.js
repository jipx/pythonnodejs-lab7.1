//// create_report_code.js

//he handler value should be in the format filename.exportedFunction, 
//where filename is the name of your JavaScript/TypeScript file (without the extension), 
//and exportedFunction is the name of the exported Lambda handler function.


exports.lambda_handler = async (event, context) => {
    const return_me = {
        msg_str: 'Report processing, check your phone shortly',
    };

    return return_me;
};






