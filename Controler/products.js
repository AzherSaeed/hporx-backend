const productSchema = require("../Model/addProduct");

exports.getAllProducts = async (req, res, next) => {
    try {

        const queryData =  await productSchema.find({})

        

        return res.status(200).json({
            data : queryData,
            success: true,
            message: 'your request has been submitted'
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }


}