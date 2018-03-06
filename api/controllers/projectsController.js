'use strict';


var mongoose = require('mongoose'),
Projects = mongoose.model('projects'),
Discussion = mongoose.model('discussions'),
Notes = mongoose.model('notes'),
Files = mongoose.model('files');

//Date Stuff
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var dt = new Date();


//Upload File Var
const express = require('express');
const multer = require('multer');
const path = require('path');

/*
NOT EQUAL TO 
{ $ne: 'Active' }
*/
exports.list_all_projects = function(req, res) {
    var header = req.headers['test'];
    if(header != null){
        Projects.find({"Company":{$elemMatch:{"name":header}}}, function(err, projects) {
            if (err)
            res.send(err);
            res.json(projects);
            
        });  
    }
    else{
        Projects.find({},{},{ sort: { 'created_at' : -1 } }, function(err, projects) {
            if (err)
            res.send(err);
            res.json(projects);
            
        });
    }
};




exports.create_a_projects = function(req, res) {
    Projects.create(req.body).then(function (err,projects,data){
        if (err)
        res.send(err);
        res.json(projects);
        console.log('1 New data added');
        
    });
    return res.redirect("../../Projects/Projects.html");
    
};

exports.read_a_projects = function(req, res) {
    
    Projects.findById(req.params.projectsId, function(err, projects) {
        if (err)
        res.send(err);
        res.json(projects);
        
        
    });
    
    /*
    Projects.findOne({Project_Name: "TEST DARI HTML"},function (err,projects){
        var test= projects.Company.name(req.params.projectsId);
        console.log(test);
    });
    */
};

exports.update_a_projects = function(req, res) {
    Projects.findOneAndUpdate({_id: req.params.projectsId}, req.body, {new: true},function(err, projects) {
        if (err)
        {res.send(err);}
        res.json(projects);
        console.log('Project With Id: '+projects._id+' Was Updated');
    });
    //return res.redirect(301,"../../Projects/Projects.html");
};


exports.delete_a_projects = function(req, res) {
    Projects.remove({
        _id: req.params.projectsId
    }, function(err, task) {
        if (err)
        res.send(err);
        res.json({ message: 'Projects successfully deleted' });
    });
};
//Discussion
exports.list_discussions_by_projectsId = function(req, res){
    Discussion.find({Projects:req.params.projectsId,Status:'Active'}).populate('Projects','Project_Name Description').exec(function (err,discussions){
        if(err)
        res.send(err);
        res.json(discussions);
        
        
    });
};
exports.read_discussion_by_projectsId_discussionId = function(req, res){
    var dis = Discussion.find({_id:req.params.discussionsId,Projects:req.params.projectsId}).populate('Projects','Project_Name').exec(function (err,discussions){
        if(err)
        res.send(err);
        res.json(discussions);
        
       
    }); 
};
exports.create_discussion_in_projects = function(req,res){
    var discussions = new Discussion({
        _id: new mongoose.Types.ObjectId(),
        Projects:req.params.projectsId,
        Discussion_Name : req.body.Discussion_Name,
        Discussion_About : req.body.Discussion_About
    });
    
    discussions.save(function(err,discussions){
        Projects.findOneAndUpdate({ _id: req.params.projectsId  }, { $push: { Discussion: discussions._id }},{upsert: true,new:true}, function(err,projects){
            if (err) return handleError(err);
        });
        if(err) 
        res.send(err);
        res.json(discussions._id);
    });
};
exports.add_comment = function(req,res){
    console.log('adding comment');
    console.log('person'+req.body.person);
    console.log('message'+req.body.message);
    
    var comment = {person:req.body.person,message:req.body.message};
    Discussion.findOneAndUpdate({ _id: req.params.discussionsId  }, { $push: { Comments: comment }},{upsert: true,new:true}, function(err,discussions){
        if(err) 
        res.send(err);
        console.log('comment added');
        res.json(discussions);
    });
    
}
exports.update_a_discussion = function(req,res) {
    var header = req.headers['movetotrash'];
    if(header != null && header == 'Trash'){
        Discussion.findByIdAndRemove(req.params.discussionsId,function(err,discussions){
            if (err)
            res.send(err);
            
        });
        /*
        Discussion.findByIdAndUpdate(req.params.discussionsId, { $set: { Status: header }}, {new: true}, function(err, discussions) {
            if (err)
            res.send(err);
            res.json(discussions);
        });  
        */
    }
    
    else{    
        Discussion.findOneAndUpdate({_id: req.params.discussionsId}, req.body, {new: true}, function(err, discussions) {
            if (err)
            res.send(err);
            res.json(discussions);
        });
    }
};
//Notes'
exports.list_notes_by_projectsId = function(req, res){
    Notes.find({Projects:req.params.projectsId,Status:'Active' }).populate('Projects','Project_Name').exec(function (err,notes){
        if(err)
        res.send(err);
        res.json(notes);  
    });
};
exports.create_notes_in_projects = function(req,res){
    console.log('New Note');
    var notes = new Notes({
        _id: new mongoose.Types.ObjectId(),
        Projects:req.params.projectsId,
        Note_Title : req.body.Note_Title,
        Content : req.body.Content
    });
    
    notes.save(function(err,notes){
        Projects.findOneAndUpdate({ _id: req.params.projectsId  }, { $push: { Notes: notes._id }},{upsert: true,new:true}, function(err,notes){
            if (err) return handleError(err);
        });
        if(err) 
        res.send(err);
        //res.json(notes);
        res.redirect("../../Projects/ProjectsDetail.html?projectsId="+req.params.projectsId);
    });
};
exports.read_notes_by_projectsId_notesId = function(req, res){
    Notes.find({_id:req.params.notesId,Projects:req.params.projectsId}).populate('Projects','Project_Name').exec(function (err,notes){
        if(err)
        res.send(err);
        res.json(notes);
        
    }); 
};
exports.update_a_notes = function(req,res) {
    var header = req.headers['movetotrash'];
    if(header != null){
        Notes.findByIdAndUpdate(req.params.notesId, { $set: { Status: header }}, {new: true}, function(err, notes) {
            if (err)
            res.send(err);
            res.json(notes);
        });  
    }
    else{    
        Notes.findOneAndUpdate({_id: req.params.notesId}, req.body, {new: true}, function(err, notes) {
            if (err)
            res.send(err);
            res.json(notes);
        });
    }
};
//Files
exports.list_files_by_projectsId = function(req, res){
    Files.find({Projects:req.params.projectsId,Status:'Active'},{},{ sort: { 'created_at' : -1 } }).populate('Projects','Project_Name').exec(function (err,files){
        if(err)
        res.send(err);
        res.json(files);  
    });
};
exports.create_files_in_projects = function(req,res){
    console.log('Uploading file');
    //===========================UPLOAD
    // Set The Storage Engine
    const storage = multer.diskStorage({
        destination: './public/ProjectUploads/'+req.params.projectsId,
        filename: function(req, file, cb){
            cb(null,file.originalname);
        }
    });
    // Init Upload
    const upload = multer({
        storage: storage,
        limits:{fileSize: 16000000},
        fileFilter: function(req, file, cb){
            checkFileType(file, cb);
        }
    }).single('myImage');
    // Check File Type
    function checkFileType(file, cb){
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif|vnd.openxmlformats-officedocument.wordprocessingml.document|x-msdownload|docx|doc|xlsx|xls|mp3|exe|js|php|css|pdf|rar|zip|html/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        console.log(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
        console.log(file.mimetype);

        if(mimetype && extname){
            return cb(null,true);
        } else {
            res.send(500,"NoExt");
        }
    }
    
    //============================UPLOAD
    
    upload(req, res, (err) => {
        if(err){
            console.log(err.message);
            res.send(500,"File Too Large");
        } else {
            if(req.file == undefined){
                res.send(500,"Empty Field");
            } else {
                //res.render("ProjectsDetail.html?projectsId="+req.params.projectsId);
                var date = monthNames[dt.getMonth()] + " " + (dt.getDate()) + " , " + dt.getFullYear();
                console.log(req.file.path);
                var files = new Files({
                    _id: new mongoose.Types.ObjectId(),
                    Projects:req.params.projectsId,
                    File_Name : req.file.filename,
                    Extension:req.file.mimetype,
                    Date_Display:date
                    
                });
                
                files.save(function(err,files){
                    Projects.findOneAndUpdate({ _id: req.params.projectsId  }, { $push: { Files: files._id }},{upsert: true,new:true}, function(err,files){
                        if (err) return handleError(err);
                    });
                    if(err) 
                    res.send(err);
                    res.json(files);
                });
            }
        }
    }); 
};
/*
exports.read_files_by_projectsId_notesId = function(req, res){
    Notes.find({_id:req.params.notesId,Projects:req.params.projectsId}).populate('Projects','Project_Name').exec(function (err,notes){
        if(err)
        res.send(err);
        res.json(notes);
        
    }); 
};
*/
exports.move_file_to_trash = function(req,res) {
    var header = req.headers['movetotrash'];
    if(header != null){
        Files.findByIdAndUpdate(req.params.filesId, { $set: { Status: header }}, {new: true}, function(err, files) {
            if (err)
            res.send(err);
            res.json(files);
        });  
    }
    else{
        res.json({message:'Something went when moving the file'})
    }
    
};