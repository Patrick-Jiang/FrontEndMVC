class Model {
    constructor() {
        // The state of the model, an array of to projects, prepopulated with some data

        this.todos = [
            {id: 1, text: 'Run a marathon', complete: false},
            {id: 2, text: 'Plant a garden', complete: false},
        ]
    }


    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false
        }
        this.todos.push(todo)
    }

    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo
        )
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id)
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id ? {
            id: todo.id,
            text: todo.text,
            complete: !todo.complete
        } : todo)
    }
}

class View {
    constructor() {
        this.app= this.getElement('#root')
        this.title = this.createElement('hi')
        this.title.textContent = 'Todos'
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) {
            element.classList.add(className)
        }

        return element
    }

    getElement(selector) {
        return document.querySelector(selector)

    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }
}


const app = new Controller(new Model(), new View())

