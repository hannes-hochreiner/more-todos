<mr-todolist>
  <form onsubmit={createNewTodo}>
    <input type="text" name="newTodoText"></input>
    <button>submit</button>
  </form>
  <ul>
    <li each={todo in todos}><mr-todo todo={todo}></mr-todo></li>
  </ul>
  <script>
    this.todos = [];

    this.createNewTodo = function() {
      this.todos.push({"text": this.newTodoText.value});
      this.newTodoText.value = "";
    }
  </script>
</mr-todolist>
