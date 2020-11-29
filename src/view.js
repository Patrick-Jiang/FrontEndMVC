
export class View {
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