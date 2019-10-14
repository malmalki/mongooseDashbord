var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
app.listen(8000, () => console.log("listening on port 8000"));


mongoose.connect("mongodb://localhost/animal", { useNewUrlParser: true,useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const AnimalSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  { timestamps: true }
);
const Animal = mongoose.model("Animal", AnimalSchema);

app.get("/", (req, res) => {
    arr = Animal.find({},(err, animals) => {
        res.render('index', {arr:animals});
      })
  });

app.get("/view/:id" , (req , res)=>{
    var id = req.params.id;
    console.log(id);
    
    sing = Animal.findOne({_id :id} , (err, animals) => {
        res.render('view', {sing:animals});
    });
});

app.get("/edit/:id" , (req , res)=>{
    var id = req.params.id;
    console.log(id);
    
    sing = Animal.findOne({_id :id} , (err, animals) => {
        res.render('edit', {sing:animals});
    });
});

app.post('/new', (req, res) =>{
    const animal = new Animal();
    animal.name = req.body.name;
    animal.age = req.body.age;
    animal.save()
        .then(newAnimalData => console.log('new animal' , newAnimalData))
        .catch((err => console.log(err)));
    res.redirect('/');  
});

app.post('/update/:id', (req, res) =>{
    var id = req.params.id;
    Animal.update(
       {_id: id,
       name: req.body.name ,
        age: req.body.age}
       
    ).exec();
    res.redirect('/');
   
});
app.post('/delete/:id', (req, res) =>{
    var id = req.params.id;
    console.log(id);
    Animal.remove({_id: id}).exec();
    res.redirect('/');
   
});




