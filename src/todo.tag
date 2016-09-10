<mr-todo class="mdl-list__item">
  <span class="mdl-list__item-primary-content">
    {todo.text}
  </span>
  <span class="mdl-list__item-secondary-action">
    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
      <input type="checkbox" class="mdl-checkbox__input" checked="{todo.completed}" onchange="{toggleTodo}"></input>
    </label>
  </span>
  <script>
    this.todo = opts.todo;
    this.repo = opts.repository;

    this.on("updated", function() {
      this.upgradeRecursively(this.root);
    });

    this.upgradeRecursively = function(elem) {
      componentHandler.upgradeElement(elem);

      for (let childCntr = 0; childCntr < elem.children.length; childCntr++) {
        this.upgradeRecursively(elem.children[childCntr]);
      }
    };

    this.toggleTodo = function() {
      this.todo.completed = !this.todo.completed;
      this.repo.updateTodo(this.todo);
    };
  </script>
</mr-todo>
