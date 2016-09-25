/** Presenter for the todo list component */
export class TodolistPresenter {
  /**
   * @param {Repository} repo Object implementing the repository interface
   * @param {PubSub} pubsub Object implementing the pubsub interface
   */
  constructor(repo, pubsub) {
    if (typeof repo === "undefined") {
      throw new Error("A repository needs to be provided.");
    }

    if (typeof pubsub === "undefined") {
      throw new Error("A messaging bus needs to be provided.");
    }

    this._repo = repo;
    this._pubsub = pubsub;
    this._pubsub.subscribe("todo.created", this._updateTodoList.bind(this));
    this._pubsub.subscribe("todo.deleted", this._updateTodoList.bind(this));
    this._pubsub.subscribe("todo.updated", this._updateTodoList.bind(this));
  }

  /** Initialize the view
   * @param {View} view view to be initialized
   * @returns {Promise<>} empty promise
   */
  init(view) {
    this._view = view;

    return this._updateTodoList();
  }

  /** Create a new todo
  * @returns {Promise<>} empty promise
  */
  createTodo() {
    return this._repo.createTodo({
      "text": this._view.getNewTodoText(),
      "completed": false
    });
  }

  _updateTodoList() {
    return this._repo.getAllTodos().then((res) => {
      this._view.setTodos(res);
    });
  }
}
