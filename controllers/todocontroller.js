var bodyParser = require('body-parser')
var mongoose = require('mongoose')

//Connect to db
mongoose.connect('mongodb://test:link-here')


//Creat a schema - a blueprint
var todoSchema = new mongoose.Schema({
    task: String
})

var Todo = mongoose.model('Todo', todoSchema)

// var data = [{task: 'Do 25 pushups'}, {task: 'Learn ExpressJs'}, {task: 'Meditate for 20min'}]
var urlencodedParser = bodyParser.urlencoded({extended: false})
module.exports = function(app){
    
app.get('/todo', function(req, res){
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.render('todo', {todos: data})
    })

})

app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
        if (err) throw err;
        res.json(data)
    })
})

app.delete('/todo/:task', function(req, res){
    //delete the requested item from the mongodb
    Todo.find({item: req.params.item.replace(/|-/g, "")}).remove(function(err,data){
        if (err) throw err;
        res.json(data)
    })
})
}