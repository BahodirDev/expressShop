const {Schema,model} = require('mongoose');

const orderMOdel = new Schema({
    notebooks:[{
        notebook:Object,
        count:Number
    }],
    user:{
        userId:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
        name:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports = model('order',orderMOdel);