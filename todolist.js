riot.tag2('mr-todolist', '<form onsubmit="{createNewTodo}"> <div class="mdl-textfield mdl-js-textfield"> <input class="mdl-textfield__input" type="text" id="newTodoText"> <label class="mdl-textfield__label" for="newTodoText">new todo...</label> </div> </form> <div class="mdl-list"> <mr-todo each="{todo in todos}" todo="{todo}"></mr-todo> </div>', '', '', function(opts) {
"use strict";

console.log(opts);
this.repo = opts.repository;
this.pubsub = opts.pubsub;
this.todos = [];

this.createNewTodo = function () {
  this.repo.createTodo({
    "text": this.newTodoText.value
  });
  this.newTodoText.value = null;
};

this.updateTodoList = function () {
  var _this = this;

  this.todos.splice(0, this.todos.length);
  repo.getAllTodos().then(function (res) {
    res.forEach(function (elem) {
      _this.todos.push(elem);
    });

    _this.update();
  });
};

this.pubsub.subscribe("todo.created", this.updateTodoList.bind(this));
this.pubsub.subscribe("todo.deleted", this.updateTodoList.bind(this));
this.updateTodoList();

this.on("updated", function () {
  this.upgradeRecursively(this.root);
});

this.upgradeRecursively = function (elem) {
  componentHandler.upgradeElement(elem);

  for (var childCntr = 0; childCntr < elem.children.length; childCntr++) {
    this.upgradeRecursively(elem.children[childCntr]);
  }
};
});
