//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
var surrogateKey=1;
var app = express();

var tasks = []

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

///CREAR
app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = surrogateKey++;
    req.body.status = "PENDING";
    tasks.push(req.body);
    res.send("OK");
});

///OBTENER ELEMENTO
app.get("/tasks/:taskId", (req, res) => {
    const task = tasks.find(task => task.id == req.params.taskId);
    if(task){
        res.json(task);
    }else{
        res.sendStatus(404);
    }
});

/// LISTAR
app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

/// ELIMINAR
app.delete("/tasks/:taskId", jsonParser, (req, res) => {
    var index = tasks.find(task => task.id == req.params.taskId);
    console.log("Index: "+index);
    if(index) {
        tasks.splice(index,1);
        res.sendStatus(200);
    }else {
        res.sendStatus(404);
    }
});

///CAMBIAR ESTADO Y MODIFICAR
app.put("/tasks/:taskId", jsonParser, function(req, res) {
    var task = tasks.find(task => task.id == req.params.taskId);
    const status = req.query.status;
    if(task){
        if (status) {
            if(status=='PENDING'){
                task.status = req.body.status;
                res.json(task);
            }else{
                task.status = req.body.status;
                res.json(task);
            }
        }
        else{
            task.title = req.body.title;
            task.detail = req.body.detail;
            res.json(task);
        }
    }else{
        res.sendStatus(404);
    }
});
app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});