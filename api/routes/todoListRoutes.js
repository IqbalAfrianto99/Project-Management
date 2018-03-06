'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  var penduduk = require('../controllers/pendudukController');
  
    // todoList Routes
    app.route('/penduduks')
    .get(penduduk.list_all_penduduk)
    .post(penduduk.create_penduduk);
  
  
    app.route('/penduduks/:NIP')
    .get(penduduk.read_penduduk)
    .put(penduduk.update_penduduk)
    .delete(penduduk.delete_penduduk);
 

};