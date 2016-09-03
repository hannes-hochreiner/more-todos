riot.tag2('mr-todolist', '<form onsubmit="{createNewTodo}"> <div class="mdl-textfield mdl-js-textfield"> <input class="mdl-textfield__input" type="text" id="newTodoText"> <label class="mdl-textfield__label" for="newTodoText">new todo...</label> </div> </form> <div class="mdl-list"> <mr-todo each="{todo in todos}" todo="{todo}"></mr-todo> </div>', '', '', function(opts) {
"use strict";

this.todos = [];

this.createNewTodo = function () {
  this.todos.push({
    "_id": this.todos.length,
    "text": this.newTodoText.value
  });
  this.newTodoText.value = null;
};
});
