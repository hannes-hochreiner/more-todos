# Repository

Brief description of the repository interface.

## Promise&lt;todo[]&gt; getAllTodos()

Returns a promise which will resolve to a list of all todos.

## void createTodo(todo)

Expects "todo" to be a new todo object.
Returns nothing.
Triggers the event "todo.created" with the id of the newly created todo as data.

## void deleteTodo(todo)

Expects "todo" to be an existing todo object.
Returns nothing.
Triggers the event "todo.deleted" with the id of the deleted todo as data.

## void updateTodo(todo)

Expects "todo" to be an existing todo object.
Returns nothing.
Triggers the event "todo.updated" with the id of the updated todo as data.
