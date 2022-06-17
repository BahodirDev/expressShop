const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const orderRoute = require('./routes/order');

const mongoose = require('mongoose');
const URLDB = require('./config');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');
const user = require("./models/user");


const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.use(async(req,res,next)=>{
  const userOne = await user.findById('62ac063ab9c679ff76933f7f');
  req.user = userOne;
  next()
})

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/order",orderRoute)


async function start(){
  const PORT = process.env.PORT || 5000;
  mongoose.connect(URLDB)

  const candidate = await user.findOne();
  if(!candidate){
    const newUser = new user({
      name:'Bahodirjon',
      email:'Test@Test.com',
      cart:{items:[]}
    })
    newUser.save()
  }

  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
  });

}
start()



// ``
