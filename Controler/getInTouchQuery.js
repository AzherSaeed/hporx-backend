const getInTouchQuerySchema = require('../Model/getInTochModel');


exports.getInTouchQuerySubmittion = async (req, res, next) => {
    const {name , email , phone , subject , option , message } = req.body;

    try {

        const queryData = new getInTouchQuerySchema({name , email , phone , subject , option , message })

        const saveData = await queryData.save()

        return res.status(200).json({
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