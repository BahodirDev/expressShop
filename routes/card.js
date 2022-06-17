const { Router } = require("express");
const Card = require("../models/card");
const Notebook = require("../models/notebook");
const router = Router();

function mapArr(items){
  return items.map((item)=>({
    ...item.notebookId._doc,
    id:item.notebookId.id,
    count:item.count
  }))
}

function resultPrice(notebooks){
  return notebooks.reduce((tot,base)=>{
    return tot += base.count * base.price
  },0)
}

router.post("/add", async (req, res) => {
  const notebook = await Notebook.findById(req.body.id);
  await req.user.addToCart(notebook);
  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
  await req.user.removeItem(req.params.id);
  const user = await req.user.populate('cart.items.notebookId');
  const notebooks = mapArr(user.cart.items);
  const cart ={
    notebooks,
    price:resultPrice(notebooks)
  }
  res.status(200).json(cart);
});

router.get("/", async (req, res) => {
  const user = await req.user.populate('cart.items.notebookId');
  const notebooks = mapArr(user.cart.items)
  console.log(notebooks);

  res.render("card", {
    title: "Basket",
    isCard: true,
    notebooks:notebooks,
    price: resultPrice(notebooks),
  });
});

module.exports = router;
