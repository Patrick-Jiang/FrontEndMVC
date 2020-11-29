export class Model {
    constructor() {
        // The state of the model, an array of to projects, prepopulated with some data
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
        if(this.todos.length === 0 ){this.todos.push(
            {id: 1, text: 'Run a marathon', complete: false},
            {id: 2, text: 'Plant a garden', complete: false},
        )}
        console.log(this.todos)
    }
    _commit(todos){
        this.onTodoListChanged(todos)
        console.log('Localstorage')
        localStorage.setItem('todos',JSON.stringify(todos))
    }

    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false
        }
        this.todos.push(todo)
        this.onTodoListChanged(this.todos)
        this._commit(this.todos)
    }

    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo
        )
        this.onTodoListChanged(this.todos)
        this._commit(this.todos)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id)
        this.onTodoListChanged(this.todos)
        this._commit(this.todos)
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id ? {
            id: todo.id,
            text: todo.text,
            complete: !todo.complete
        } : todo)
        this.onTodoListChanged(this.todos)
        this._commit(this.todos)
    }

    bindTodoListChanged(callback){
        this.onTodoListChanged = callback
    }
}
