riot.tag2('mr-todo', '<span class="mdl-list__item-primary-content"> {todo.text} </span> <span class="mdl-list__item-secondary-action"> <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"> <input type="checkbox" class="mdl-checkbox__input" __checked="{todo.completed}" onchange="{toggleTodo}"></input> </label> </span>', '', 'class="mdl-list__item"', function(opts) {
"use strict";

this.todo = opts.todo;
this.repo = opts.repository;

this.on("updated", function () {
  this.upgradeRecursively(this.root);
});

this.upgradeRecursively = function (elem) {
  componentHandler.upgradeElement(elem);

  for (var childCntr = 0; childCntr < elem.children.length; childCntr++) {
    this.upgradeRecursively(elem.children[childCntr]);
  }
};

this.toggleTodo = function () {
  this.todo.completed = !this.todo.completed;
  this.repo.updateTodo(this.todo);
};
});
