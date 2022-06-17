const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", async (req, res) => {
  const notebooks = await Notebook.find();
  res.render("notebooks", { title: "Notebooks", isNotebooks: true, notebooks });
});

router.post('/remove',async (req,res)=>{
  await Notebook.deleteOne({_id:req.body.id});
  res.redirect('/notebooks')
})

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const notebook = await Notebook.findById(req.params.id);
  res.render("notebook-edit", {
    title: `Edit ${notebook.title}`,
    notebook,
  });
});

router.post("/edit", async (req, res) => {
  await Notebook.findByIdAndUpdate(req.body.id,req.body);
  res.redirect("/notebooks");
});

router.get("/:id", async (req, res) => {
  const notebook = await Notebook.findById(req.params.id);
  res.render("notebook", {
    layout: "detail",
    title: `Notebook ${notebook.title}`,
    notebook,
  });
});

module.exports = router;
