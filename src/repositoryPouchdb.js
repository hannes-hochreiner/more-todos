class RepositoryPouchdb {
  constructor(pouchdb, pubsub) {
    this.pouchdb = pouchdb;
    this.pubsub = pubsub;
  }

  getAllTodos() {
    return this.pouchdb.allDocs({include_docs: true});
  }

  createTodo(todo) {
    this.pouchdb.post(todo).then((resp) => {
      this.pubsub.publish("todo.created", resp.id);
    }).catch((err) => {
      this.pubsub.publish("error.repositoryPouchdb.createTodo", err);
    });
  }

  deleteTodo(todo) {
    this.pouchdb.remove(todo).then((resp) => {
      this.pubsub.publish("todo.deleted", resp.id);
    }).catch((err) => {
      this.pubsub.publish("error.repositoryPouchdb.deleteTodo", err);
    });
  }
}
