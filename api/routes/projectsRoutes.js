'use strict';
module.exports = function(app) {
  var projects = require('../controllers/projectsController');
  
  
  // projects Routes
  app.route('/projects')
  .get(projects.list_all_projects)
  .post(projects.create_a_projects);
  
  
  app.route('/projects/:projectsId')
  .get(projects.read_a_projects)
  .put(projects.update_a_projects)
  .delete(projects.delete_a_projects);

  
  
  //discussion Routes
  app.route('/projects/:projectsId/Discussions')
  .get(projects.list_discussions_by_projectsId)
  .post(projects.create_discussion_in_projects);
  
  app.route('/projects/:projectsId/Discussions/:discussionsId')
  .get(projects.read_discussion_by_projectsId_discussionId)
  .put(projects.update_a_discussion);

  app.route('/projects/:projectsId/Discussions/:discussionsId/comment')
  .post(projects.add_disc_comment);

  //notes Routes
  app.route('/projects/:projectsId/Notes')
  .get(projects.list_notes_by_projectsId)
  .post(projects.create_notes_in_projects);
 
  app.route('/projects/:projectsId/Notes/:notesId')
  .get(projects.read_notes_by_projectsId_notesId)
  .put(projects.update_a_notes);

  app.route('/projects/:projectsId/Notes/:notesId/comment')
  .post(projects.add_note_comment);

  //files Routes
  app.route('/projects/:projectsId/Files')
  .get(projects.list_files_by_projectsId)
  .post(projects.create_files_in_projects);
 
  app.route('/projects/:projectsId/Files/:filesId')
  .put(projects.move_file_to_trash);
  
};