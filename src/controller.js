export class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.view.bindAddTodo(this.handleAddTodo)
        this.view.bindDeleteTodo(this.handleDeleteTodo)
        this.view.bindToggleTodo(this.handleToggleTodo)
        this.view.bindEditTodo(this.handleEditTodo)
        this.onTodoListChanged(this.model.todos)
        this.model.bindTodoListChanged(this.onTodoListChanged)
    }

    onTodoListChanged = (todos) => {
        this.view.displayTodo(todos)
    }

    handleAddTodo = (todoText) => {
        this.model.addTodo(todoText)
    }
    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText)
    }
    handleDeleteTodo = (id) => {
        console.log('delete')
        this.model.deleteTodo(id)
    }
    handleToggleTodo = (id) => {
        this.model.toggleTodo(id)
    }
}

