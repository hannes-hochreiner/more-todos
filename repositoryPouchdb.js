"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, RepositoryPouchdb;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("RepositoryPouchdb", RepositoryPouchdb = function () {
        function RepositoryPouchdb(pouchdb, pubsub) {
          _classCallCheck(this, RepositoryPouchdb);

          this.pouchdb = pouchdb;
          this.pubsub = pubsub;
        }

        _createClass(RepositoryPouchdb, [{
          key: "getAllTodos",
          value: function getAllTodos() {
            return this.pouchdb.allDocs({ include_docs: true }).then(function (res) {
              return res.rows.map(function (row) {
                return row.doc;
              });
            });
          }
        }, {
          key: "createTodo",
          value: function createTodo(todo) {
            var _this = this;

            return this.pouchdb.post(todo).then(function (resp) {
              _this.pubsub.publish("todo.created", resp.id);
            }).catch(function (err) {
              _this.pubsub.publish("error.repositoryPouchdb.createTodo", err);
            });
          }
        }, {
          key: "deleteTodo",
          value: function deleteTodo(todo) {
            var _this2 = this;

            return this.pouchdb.remove(todo).then(function (resp) {
              _this2.pubsub.publish("todo.deleted", resp.id);
            }).catch(function (err) {
              _this2.pubsub.publish("error.repositoryPouchdb.deleteTodo", err);
            });
          }
        }, {
          key: "updateTodo",
          value: function updateTodo(todo) {
            var _this3 = this;

            return this.pouchdb.put(todo).then(function (resp) {
              _this3.pubsub.publish("todo.updated", resp.id);
            }).catch(function (err) {
              _this3.pubsub.publish("error.repositoryPouchdb.updateTodo", err);
            });
          }
        }]);

        return RepositoryPouchdb;
      }());

      _export("RepositoryPouchdb", RepositoryPouchdb);
    }
  };
});
