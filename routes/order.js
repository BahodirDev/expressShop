const {Router} = require('express');
const Order = require('../models/order');
const router = Router();

router.get('/',async(req,res)=>{

    const orders = await Order.find({'user.userId':req.user._id}).populate('user.userId');

    console.log(orders);
    res.render('orders',{isOrder:true,title:'Order Page',
    orders:orders.map((item)=>({
        ...item._doc,
        price:item.notebooks.reduce((tot,base)=>{
            return tot += base.count * base.notebook.price
        },0)
    }))
})
})
router.post('/',async(req,res)=>{
   const user = await req.user.populate('cart.items.notebookId');
   const notebooks = user.cart.items.map((item)=>({
    notebook:{...item.notebookId._doc},
    count:item.count
   }))

   const order = new Order({
    notebooks,
    user:{
        userId:req.user._id,
        name:req.user.name
    }
   })

  await  order.save();
   await req.user.cleanCart()

    res.redirect('/order')
})

module.exports =router;