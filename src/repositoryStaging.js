/** Repository implementation for staging without persistent staging */
export class RepositoryStaging {
  /**
   * @param {PubSub} pubsub Object implementing the pubsub interface
   */
  constructor(pubsub) {
    this._pubsub = pubsub;
    this._todos = [
      { "id": "todo0", "text": "todo text 0", "completed": false },
      { "id": "todo1", "text": "todo text 1", "completed": false }
    ];
  }

  /** Retrieval of all todos
   * @returns {Promise<Todo[]>} Promise to an array of documents
   */
  getAllTodos() {
    return new Promise((resolve, reject) => {
      resolve(this._clone(this._todos));
    });
  }

  /** Creation of a new todo
   * @param {Todo} todo Todo to be persisted
   * @emits {todo.created<String>} on creation of a new todo its id is emitted
   * @returns {Promise<>} empty promise
   */
  createTodo(todo) {
    return new Promise((resolve, reject) => {
      let newTodo = this._clone(todo);

      newTodo.id = `todo${this._todos.length}`;
      this._todos.push(newTodo);
      this._pubsub.publish("todo.created", newTodo.id);
      resolve();
    });
  }

  /** Deletion of a todo
   * @param {Todo} todo Todo to be deleted
   * @emits {todo.deleted<String>} on deletion of the todo its id is emitted
   * @returns {Promise<>} empty promise
   */
  deleteTodo(todo) {
    return new Promise((resolve, reject) => {
      this._todos = this._todos.filter((elem) => {
        return elem.id !== todo.id;
      });
      this._pubsub.publish("todo.deleted", todo.id);
      resolved();
    });
  }

  /** Update of a todo
   * @param {Todo} todo Todo to be updated
   * @emits {todo.updated<String>} on update of a todo its id is emitted
   * @returns {Promise<>} empty promise
   */
  updateTodo(todo) {
    return new Promise((resolve, reject) => {
      let newTodo = this._clone(todo);
      let idx = this._todos.findIndex((elem) => {
        return elem.id === newTodo.id;
      });

      this._todos.splice(idx, 1, newTodo);
      this._pubsub.publish("todo.updated", newTodo.id);
      resolved();
    });
  }

  _clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
