var mongoose = require('mongoose');
var Projects = require('./projectsModel');
Projects = mongoose.model('projects');
Discussion = mongoose.model('discussions');
Notes = mongoose.model('notes');
Files = mongoose.model('files');


mongoose.connect('mongodb://localhost/testProjects');
mongoose.connection.on('error', function () {
  console.error('connection error', arguments);
});
mongoose.connection.once('open', function () {
    console.error('Connected');
  });
/*
var projects1 = new Projects({
  _id: new mongoose.Types.ObjectId,
  Project_Name : 'added by api',
  Description : 'addded by api',
  Template : 'added by api',
  Label : 'added by api',
  Category: 'added by api',
  Client_Company: 'added by api',
  Company:{name:'added by api'}
});
projects1.save(function(err){
  if (err) return handleError(err);

  var discussion1 = new Discussion({
    Projects : projects1._id,
    Discussion_Name: 'Diskusi 1',
    Discussion_About: 'Diskuasi 1'
  });
  discussion1.save(function (err) {
    if (err) return handleError(err);
    // thats it!
  });
  projects1.Discussion.push(discussion1);
  projects1.save();
});
*/
//Insert Discussion
/*
var discussion1 = new Discussion({
  _id: new mongoose.Types.ObjectId(),
  Projects :'5a82aac86b5d170dfcf2143a',
  Discussion_Name:'Diskusi 2',
  Discussion_About:'Diskusi 2'
});

discussion1.save().then(function(){
  Projects.findOneAndUpdate({ _id: '5a82aac86b5d170dfcf2143a'  }, { $push: { Discussion: discussion1._id }},{upsert: true,new:true}, function(err,effected){
    if (err) return handleError(err);
    console.log(effected);
   });

});  
*/  
/*
var notes1 = new Notes({
  _id : new mongoose.Types.ObjectId(),
  Projects:'5a82aa152bdadf218c5143ca',
  Note_Title:'my second note',
  Content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sagittis libero dapibus finibus volutpat. Maecenas nec lorem vitae lacus semper placerat. Morbi erat leo, commodo a gravida sit amet, condimentum nec mauris. Vivamus lacinia finibus lectus, vitae tempor sapien porta eget. Proin porta tellus ullamcorper, porta nibh ut, pellentesque mi. Praesent sit amet velit eu ante consectetur cursus vel eu felis. Vivamus scelerisque blandit enim, at vehicula tellus scelerisque sollicitudin. Quisque tincidunt arcu eros, sed aliquet justo lacinia a. Suspendisse sodales malesuada ante, at cursus dolor sodales id. Nam dignissim sit amet lorem at pharetra. Quisque sed sem nec magna consequat mollis nec nec ex.Maecenas risus massa, scelerisque id mollis volutpat, sollicitudin facilisis tellus. Duis facilisis condimentum dui at ultrices. Nam vel sodales urna, a elementum libero. Fusce scelerisque id nisl at fringilla. Fusce nec arcu sit amet quam vulputate fermentum. Cras eleifend nec diam ac eleifend. Aliquam quis justo lacinia, lobortis quam sed, volutpat velit.'
});

notes1.save().then(function(){
  Projects.findOneAndUpdate({ _id: '5a82aa152bdadf218c5143ca'  }, { $push: { Notes: notes1._id }},{upsert: true,new:true}, function(err,effected){
    if (err) return handleError(err);
    console.log(effected);
   });

});  
*/
var files = new Files({
  _id: new mongoose.Types.ObjectId(),
  Projects :'5a82aa152bdadf218c5143ca',
  File_Name: 'Gambar.jpg'
});

files.save().then(function(){
  Projects.findOneAndUpdate({ _id: '5a82aa152bdadf218c5143ca'  }, { $push: { Files: files._id }},{upsert: true,new:true}, function(err,effected){
    if (err) return handleError(err);
    console.log(effected);
   });

}); 