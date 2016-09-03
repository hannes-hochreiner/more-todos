<mr-todolist>
  <form onsubmit={createNewTodo}>
    <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="newTodoText">
      <label class="mdl-textfield__label" for="newTodoText">new todo...</label>
    </div>
  </form>
  <ul class="demo-list-control mdl-list">
    <li each={todo in todos} class="mdl-list__item">
      <span class="mdl-list__item-primary-content">
        <mr-todo todo={todo}></mr-todo>
      </span>
      <span class="mdl-list__item-secondary-action">
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-{todo._id}">
          <input type="checkbox" id="list-checkbox-{todo._id}" class="mdl-checkbox__input" />
        </label>
      </span>
    </li>
  </ul>
  <script>
    this.todos = [];

    this.createNewTodo = function() {
      this.todos.push({
        "_id": this.todos.length,
        "text": this.newTodoText.value
      });
      this.newTodoText.value = null;
    }
  </script>
</mr-todolist>
