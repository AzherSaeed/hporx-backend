const subcriptionQuerySchema = require('../Model/SubcriptionModel');


exports.subcriptionQuerySubmittion = async (req, res, next) => {
    const {firstName , lastName  , email , phone , inviteFriend , city , service , position } = req.body;

    try {

        const queryData = new subcriptionQuerySchema({firstName , lastName  , email , phone , inviteFriend , city , service , position })

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