"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RepositoryPouchdb = function () {
  function RepositoryPouchdb(pouchdb, pubsub) {
    _classCallCheck(this, RepositoryPouchdb);

    this.pouchdb = pouchdb;
    this.pubsub = pubsub;
    this.todos = [{ _id: 1, text: "text1", completed: false }, { _id: 2, text: "text2", completed: false }, { _id: 3, text: "text3", completed: true }];
  }

  RepositoryPouchdb.prototype.getAllTodos = function getAllTodos() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      resolve(_this.todos);
    });
  };

  RepositoryPouchdb.prototype.createTodo = function createTodo(todo) {
    todo._id = this.todos.length;

    this.todos.push(todo);
    this.pubsub.publish("todo.created", todo._id);
  };

  RepositoryPouchdb.prototype.deleteTodo = function deleteTodo(todo) {
    this.todos = this.todos.filter(function (elem) {
      return elem._id !== todo._id;
    });
    this.pubsub.publish("todo.deleted", todo._id);
  };

  return RepositoryPouchdb;
}();
