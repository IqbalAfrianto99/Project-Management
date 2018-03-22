'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Discussion = new Schema({
    Projects :[{
        type: Schema.Types.ObjectId, ref: 'projects'
    }],
    Discussion_Name:{
        type: String
    },
    Discussion_About:{
        type:String
    },
    Status:{
        type:String,
        default:'Active'
    },
    Comments:[{
        person:{type:String},
        message:{type:String}
    }]

});
var Notes = new Schema({
    Projects:[{
        type: Schema.Types.ObjectId,ref: 'projects'
    }],
    Note_Title:{
        type:String,
        required:'Please Enter The Note Title'
    },
    Content:{
        type:String
    },
    Status:{
        type:[{
            type:String,
            enum:['Active','Trash']
        }],
        default:['Active']
    },
    Comments:[{
        person:{type:String},
        message:{type:String}
    }] 
});
var Tasks = new Schema({
    Projects:{
        type: Schema.Types.ObjectId,ref: 'projects'
    },
    Task_Name:{
        type:String
    },
    Description:{
        type:String
    },
    Label:{
        type:String
    },
    Assignee:{
        type:String
    },
    Due_Date:{
        type:String
    },
    Status:{
        type:[{
            type:String,
            enum:['Active','Trash','Complete']
        }],
        default:['Active']
    },
    Comments:[{
        person:{type:String},
        message:{type:String}
    }],
    Subtask: [{
        Subtask_Name :{type:String},
        Assignee:{type:String}
    }]  
});
var Files = new Schema({
    Projects:{
        type: Schema.Types.ObjectId,ref: 'projects'
    },
    File_Name:{
        type:String
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Date_Display:{
        type:String
    },
    Extension:{
        type:String
    },
    Status:{
        type:[{
            type:String,
            enum:['Active','Trash']
        }],
        default:['Active']
    } 
});
var CompanySchema = new Schema({
    name:{type:String}
});

var Projects = new Schema({
    Project_Name:{
        type: String,
        required: [true, "Project Name Required"]
    },
    Description: {
        type: String
    },
    Template: {
        type: String
    },
    Label: {
        type: String,
        default: 'ONGOING'
    },
    Category: {
        type: String
    },
    Client_Company: {
        type: String
    },
    Company:[CompanySchema],
    Status:{
        type:[{
            type:String,
            enum:['Active','Trash']
        }],
        default:['Active']
    },
    Discussion:[{type:Schema.Types.ObjectId, ref: 'discussion'}],
    Notes:[{type:Schema.Types.ObjectId, ref:'notes'}],
    Files:[{type:Schema.Types.ObjectId, ref:'files'}],
    Tasks:[{type:Schema.Types.ObjectId, ref:'tasks'}]
});



module.exports=mongoose.model('discussions',Discussion);
module.exports=mongoose.model('projects', Projects);
module.exports=mongoose.model('notes',Notes);
module.exports=mongoose.model('files',Files);
module.exports=mongoose.model('tasks',Tasks);



