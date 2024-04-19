const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.set('useFindAndModify', false);

const ProductSchema = mongoose.Schema({
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        maxlength:40,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        default: 0 
    },
    images:{
        type:Array,
    },
    types:{
        type: String
    },
    sold:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        default:0
    }
},{timestamps:true});

ProductSchema.index({ 
    title:'text',
});

const Product = mongoose.model('Products',ProductSchema);

module.exports=Product;