<mr-todolist>
  <form onsubmit={createNewTodo}>
    <div class="mdl-textfield mdl-js-textfield">
      <input class="mdl-textfield__input" type="text" id="newTodoText">
      <label class="mdl-textfield__label" for="newTodoText">new todo...</label>
    </div>
  </form>
  <div class="mdl-list">
    <mr-todo each={todo in todos} todo={todo}></mr-todo>
  </div>
  <script>
    console.log(opts);
    this.repo = opts.repository;
    this.pubsub = opts.pubsub;
    this.todos = [];

    this.createNewTodo = function() {
      this.repo.createTodo({
        "text": this.newTodoText.value
      });
      this.newTodoText.value = null;
    }

    this.updateTodoList = function() {
      this.todos.splice(0, this.todos.length);
      repo.getAllTodos().then((res) => {
        res.forEach((elem) => {
          this.todos.push(elem);
        });

        this.update();
      })
    }

    this.pubsub.subscribe("todo.created", this.updateTodoList.bind(this));
    this.pubsub.subscribe("todo.deleted", this.updateTodoList.bind(this));
    this.updateTodoList();
  </script>
</mr-todolist>
