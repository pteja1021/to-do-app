const express=require("express");
const mongoose  = require("mongoose");
const todo=require("./models/todo");

//creating an express app
const app=express();

//connecting to server
const dbURL="mongodb+srv://teja:cloud1234@to-do-list.uonwx.mongodb.net/to-do-list?retryWrites=true&w=majority";

mongoose.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(result=>app.listen(3000))
.catch((err)=>console.log(err));

//view engine setup, default folder is *views*
app.set("view engine","ejs");

//static files
app.use(express.static("public"));


app.use(express.urlencoded({ useNewUrlParser: true, useUnifiedTopology: true,extended:true }));

app.get("/",(req,res)=>{
    todo.find()
    .then((result)=>{ //result is an array of all objects in database
        res.render("index",{title:"to-do-list",items:result,no_of_items:result.length});
    })
    .catch(err=>console.log(err));
});

app.post("/",(req,res)=>{
    const new_task=new todo(req.body);
    new_task.save().then(()=>{
        res.redirect("/");
    })
    .catch(err=>console.log(err));
});

app.route("/delete/clear_all").get((req,res)=>{
    todo.deleteMany({},()=>{
        res.redirect("/");
    })
});

app.route("/delete/:id").get((req,res)=>{
    const id=req.params.id;
    todo.findByIdAndDelete(id)
    .then(result => {
      res.redirect("/");
    })
    .catch(err => { console.log(err); });
});

app.use((req,res)=>{
    res.status(404).render("404");
})