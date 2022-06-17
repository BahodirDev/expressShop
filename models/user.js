const {Schema,model} = require('mongoose');

const userModel = new Schema({
    name:String,
    email:String,
    cart:{
        items:[
            {
                count:Number,
                notebookId:{
                    type:Schema.Types.ObjectId,
                    ref:'notebook',
                    required:true
                }
            }
        ]
    }

});

userModel.methods.addToCart = function(notebook){
    let items = [...this.cart.items];

    const idx = items.findIndex(s=>s.notebookId.toString() === notebook.id.toString());

    if(idx >= 0){
        items[idx].count++
    }else{
        items.push({
            count:1,
            notebookId:notebook.id
        })
    }

    this.cart = {items}
    return this.save()
}

userModel.methods.removeItem=function(id){
    let items = [...this.cart.items];

    let idx = items.findIndex(s=>s.notebookId.toString() === id.toString());

    if(items[idx].count === 1){
        items = items.filter(s=>s.notebookId.toString() !== id.toString())
    }else{
        items[idx].count--
    }
    this.cart={items}
    return this.save()
}

userModel.methods.cleanCart = function(){
    this.cart ={items:[]};
    return this.save()
}

module.exports = model('user',userModel);