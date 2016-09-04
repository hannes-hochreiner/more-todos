class RepositoryPouchdb {
  constructor(pouchdb, pubsub) {
    this.pouchdb = pouchdb;
    this.pubsub = pubsub;
    this.todos = [
      { _id: 1, text: "text1", completed: false },
      { _id: 2, text: "text2", completed: false },
      { _id: 3, text: "text3", completed: true }
    ];
  }

  getAllTodos() {
    return new Promise((resolve, reject) => {
      resolve(this.todos);
    });
  }

  createTodo(todo) {
    todo._id = this.todos.length;

    this.todos.push(todo);
    this.pubsub.publish("todo.created", todo._id);
  }

  deleteTodo(todo) {
    this.todos = this.todos.filter((elem) => {
      return elem._id !== todo._id;
    });
    this.pubsub.publish("todo.deleted", todo._id);
  }
}
