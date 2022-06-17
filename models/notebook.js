const {Schema,model} = require('mongoose');

const notebookModel = new Schema({
  price:Number,
  title:String,
  img:String,
  descr:String,
  userId:{
    type:Schema.Types.ObjectId,
    ref:'user',
    required:true
  }
});

notebookModel.method('toClient',function(){
  const notebook = this.notebook;
  notebook.id = notebook._id;
  delete notebook._id;
  return notebook;
})
module.exports = model('notebook',notebookModel);