var express = require('express'),
socket = require('socket.io'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Task = require('./api/models/todoListModel'), //created model loading here
_penduduk = require('./api/models/pendudukModel'), //created model loading here
Projects = require('./api/models/projectsModel');
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testProjects',{ useMongoClient: true }); 

app.use(express.static('public'));

app.get('/',function(req,res){
    res.redirect('Projects/Projects.html');
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
var projects = require('./api/routes/projectsRoutes');

routes(app); //register the route
projects(app);

var server = app.listen(port,function(){
    console.log('Server run on port: '+port);
});

/*
var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection',socket.id);
    socket.on('newcomment',function(data){
        io.sockets.emit('newcomment',data);
        console.log(data);
        console.log(data.person+' Say '+data.message);
    });
});
*/


//console.log('todo list RESTful API server started on: ' + port);