<mr-todolist>
  <form onsubmit={createNewTodo}>
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" id="newTodoText">
      <label class="mdl-textfield__label" for="newTodoText">I should...</label>
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
        "text": this.newTodoText.value,
        "completed": false
      });
      this.newTodoText.value = null;
    }

    this.updateTodoList = function() {
      this.repo.getAllTodos().then((res) => {
        this.todos = res;
        this.update();
      })
    }

    this.pubsub.subscribe("todo.created", this.updateTodoList.bind(this));
    this.pubsub.subscribe("todo.deleted", this.updateTodoList.bind(this));
    this.pubsub.subscribe("todo.updated", this.updateTodoList.bind(this));
    this.updateTodoList();

    this.on("updated", function() {
      this.upgradeRecursively(this.root);
    });

    this.upgradeRecursively = function(elem) {
      componentHandler.upgradeElement(elem);

      for (let childCntr = 0; childCntr < elem.children.length; childCntr++) {
        this.upgradeRecursively(elem.children[childCntr]);
      }
    };
  </script>
</mr-todolist>
