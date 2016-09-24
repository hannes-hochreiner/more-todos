/** Repository implementation using pouchDb as a backend */
export class RepositoryPouchdb {
  /**
   * @param {PouchDb} pouchdb Object implementing the pouchdb interface
   * @param {PubSub} pubsub Object implementing the pubsub interface
   */
  constructor(pouchdb, pubsub) {
    this._pouchdb = pouchdb;
    this._pubsub = pubsub;
  }

  /** Retrieval of all todos
   * @returns {Promise<Todo[]>} Promise to an array of documents
   */
  getAllTodos() {
    return this._pouchdb.allDocs({include_docs: true}).then((res) => {
      return res.rows.map((row) => {
        return row.doc;
      });
    });
  }

  /** Creation of a new todo
   * @param {Todo} todo Todo to be persisted
   * @emits {todo.created<String>} on creation of a new todo its id is emitted
   * @emits {error.repositoryPouchdb.createTodo<Error>} on error the error object is emitted
   * @returns {Promise<>} empty promise
   */
  createTodo(todo) {
    return this._pouchdb.post(todo).then((resp) => {
      this._pubsub.publish("todo.created", resp.id);
    }).catch((err) => {
      this._pubsub.publish("error.repositoryPouchdb.createTodo", err);
    });
  }

  /** Deletion of a todo
   * @param {Todo} todo Todo to be deleted
   * @emits {todo.deleted<String>} on deletion of the todo its id is emitted
   * @emits {error.repositoryPouchdb.deleteTodo<Error>} on error the error object is emitted
   * @returns {Promise<>} empty promise
   */
  deleteTodo(todo) {
    return this._pouchdb.remove(todo).then((resp) => {
      this._pubsub.publish("todo.deleted", resp.id);
    }).catch((err) => {
      this._pubsub.publish("error.repositoryPouchdb.deleteTodo", err);
    });
  }

  /** Update of a todo
   * @param {Todo} todo Todo to be updated
   * @emits {todo.updated<String>} on update of a todo its id is emitted
   * @emits {error.repositoryPouchdb.updateTodo<Error>} on error the error object is emitted
   * @returns {Promise<>} empty promise
   */
  updateTodo(todo) {
    return this._pouchdb.put(todo).then((resp) => {
      this._pubsub.publish("todo.updated", resp.id);
    }).catch((err) => {
      this._pubsub.publish("error.repositoryPouchdb.updateTodo", err);
    });
  }
}
