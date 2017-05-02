var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');


var users =[
  {
    name: "david",
    age: 18
  },
  {

    name: "joe",
    age: 57
  },
  {
    name: "mary",
    age: 30
  }
]


// List all the users in an index
app.get('/users/', function (req, res) {
  res.render("index", {title: "The users page", users: users});
})

// Display the form in order to add a user
app.get('/users/add', function(req,res){
  res.render("userForm", { process: 'add'});
})

// Process the get /users/add form and save it to memory
app.post('/users/add',function(req,res){
  users.push({name: req.body.name, age: req.body.age});
  res.redirect("/users/")
})
// Edit a users
app.get("/users/edit/:name", function(req,res){

  users.forEach(function(user,index){
    if(user.name == req.params.name){
      return res.render("userForm", { process: 'edit', name: user.name, age: user.age });
    }
  })
})
app.post("/users/edit/:name", function(req,res){
  users.forEach(function(user,index){
    if(user.name == req.params.name){
      users[index].name = req.body.name
      users[index].age = req.body.age
      res.redirect("/users/")
    }
  })
})


//  Delete a users
app.get('/users/delete/:name', function(req,res){
  var foundUserIndex = null;

  console.log(req.params)
  users.forEach(function(user,index){
    if(user.name == req.params.name){
      foundUserIndex = index;
      return
    }
  })

  if(foundUserIndex  === null) return res.send("No User Found!")
  users.splice(foundUserIndex, 1);
  res.redirect("/users/")

})



app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
