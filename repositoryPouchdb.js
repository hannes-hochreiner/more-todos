"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RepositoryPouchdb = function () {
  function RepositoryPouchdb(pouchdb, pubsub) {
    _classCallCheck(this, RepositoryPouchdb);

    this.pouchdb = pouchdb;
    this.pubsub = pubsub;
  }

  RepositoryPouchdb.prototype.getAllTodos = function getAllTodos() {
    return this.pouchdb.allDocs({ include_docs: true });
  };

  RepositoryPouchdb.prototype.createTodo = function createTodo(todo) {
    var _this = this;

    this.pouchdb.post(todo).then(function (resp) {
      _this.pubsub.publish("todo.created", resp.id);
    }).catch(function (err) {
      _this.pubsub.publish("error.repositoryPouchdb.createTodo", err);
    });
  };

  RepositoryPouchdb.prototype.deleteTodo = function deleteTodo(todo) {
    var _this2 = this;

    this.pouchdb.remove(todo).then(function (resp) {
      _this2.pubsub.publish("todo.deleted", resp.id);
    }).catch(function (err) {
      _this2.pubsub.publish("error.repositoryPouchdb.deleteTodo", err);
    });
  };

  return RepositoryPouchdb;
}();
