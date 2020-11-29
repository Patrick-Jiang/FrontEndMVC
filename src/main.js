class Model {
    constructor() {
        // The state of the model, an array of to projects, prepopulated with some data
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
        this.todos = [
            {id: 1, text: 'Run a marathon', complete: false},
            {id: 2, text: 'Plant a garden', complete: false},
        ]
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

class View {
    constructor() {
        // The root element
        this.app = this.getElement('#root')

        // The title of the app
        this.title = this.createElement('hi')
        this.title.textContent = 'Todos'

        // Create the form element
        this.form = this.createElement('form')
        this.input = this.createElement('input')

        this.input.type = 'text'
        this.input.placeholder = 'Add todo'
        this.input.name = 'todo'

        this.submitButton = this.createElement('button')
        this.submitButton.textContent = 'Submit'

        this.todoList = this.createElement('ul', 'todo-list')
        this.form.append(this.input, this.submitButton)

        this.app.append(this.title, this.form, this.todoList)

        this._temporaryTodoText = ''
        this._initLocalListeners()
        console.log(this._temporaryTodoText)
    }
    _initLocalListeners(){
        this.todoList.addEventListener('input',e=>{
            if(e.target.className ==='editable'){
                this._temporaryTodoText = e.target.innerText
            }
        })
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

    get _todoText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }

    displayTodo(todos) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }
        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = ' Nothing to do?'
            this.todoList.append(p)
        } else {
            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id

                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')

                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.text
                    span.append(strike)
                } else {
                    span.textContent = todo.text
                }

                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)

                this.todoList.append(li)
            })
        }
    }
    bindAddTodo(handler){
        this.form.addEventListener('submit', e =>{
            e.preventDefault()
            if (this._todoText){
            handler(this._todoText)
            this._resetInput()
            }

        })
    }

    bindDeleteTodo(handler){
        this.todoList.addEventListener('click',e =>{
            if(e.target.className === 'delete'){
                const id = parseInt(e.target.parentElement.id)
                handler(id)
            }
        })
    }

    bindToggleTodo(handler){
        this.todoList.addEventListener('change',e=>{
            if(e.target.type === 'checkbox'){
                const id = parseInt(e.target.parentElement.id)
                handler(id)
            }
        })
    }

    bindEditTodo(handler){
        this.todoList.addEventListener('focusout',e=>{
            if(this._temporaryTodoText){
                const id = parseInt(e.target.parentElement.id)
                handler(id,this._temporaryTodoText)
                this._temporaryTodoText = ''
            }
        })
    }
}

class Controller {
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


const app = new Controller(new Model(), new View())
// app.model.addTodo('This is a test')
// app.view.displayTodo(app.model.todos)