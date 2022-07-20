// This is a basic REST-API with GET, PUT, POST, PATCH, DELETE
// Using Node.js, Express Routing, and BodyParser

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// Enter your credentials : find the PW in info.json
mongoose.connect("mongodb+srv://admin-david:PASSWORD@cluster0.alkqlfu.mongodb.net/wikiDB");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = mongoose.model("Article", articleSchema);

//////////////////////// Use ALL Articles (Collection) //////////////////////////

app.route("/articles")

.get( function(req, res) {
  console.log(req.params.title);
  Article.find(function(err, foundArticles) {
    if (err) {
      res.send("Error 500");
    } else {
      res.send(foundArticles);
    }
  });
})

.post( function(req, res) {
  console.log(req.body.title);
  console.log(req.body.content);
  let title = req.body.title;
  let content = req.body.content;
  const doc = new Article({
    title: title,
    content: content
  });
  doc.save(function(err) {
      if (!err) {
        res.send("Successfully Posted");
      } else {
        res.send(err);
      }
    }
  );
})

.delete (function(req,res){
  const article = new Article();
  Article.deleteMany({}, function(err){
    if(!err){
    res.send("Got a delete request from the user");
    }
    else{
      res.send(err);
    }
  });

});


////////////////////// Use a SINGLE Article (Document) from the Articles (Collection)

app.route("/articles/:title")

.get(function(req, res) {
  console.log(req.params.title);
  Article.find({
    title: req.params.title
  }, function(err, foundArticles) {
    if (err) {
      res.send("Error 500");
    } else {
      res.send(foundArticles);
    }
  });
})


.put(function(req, res){
  Article.updateOne({title: req.params.title},
    {title: req.body.title, content: req.body.content},
   function(err, result){
    if(!err){
      res.send("Update Successfull");
    }
    else{res.send(err);}

  });
})

.delete(function(req,res){
  Article.deleteOne({title: req.params.title}, function(err){
    if(!err){
      res.send("Deleted Succesfully");
    }
    else{
      res.send(err);
    }
  })

});
