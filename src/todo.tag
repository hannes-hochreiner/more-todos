<mr-todo>
  <input type="checkbox" value="{todo.done}" onclick="{toggle}">{todo.text}</input>
  <script>
    this.todo = opts.todo;

    this.toggle = function() {
      console.log("toggle");
    }
  </script>
</mr-todo>
