riot.tag2('mr-todo', '<input type="checkbox" value="{todo.done}" onclick="{toggle}">{todo.text}</input>', '', '', function(opts) {
"use strict";

this.todo = opts.todo;

this.toggle = function () {
  console.log("toggle");
};
});
