parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"JDu1":[function(require,module,exports) {
"use strict";function t(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}function o(t,o){for(var e=0;e<o.length;e++){var i=o[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(t,e,i){return e&&o(t.prototype,e),i&&o(t,i),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Model=void 0;var i=function(){function o(){t(this,o),this.todos=JSON.parse(localStorage.getItem("todos"))||[],this.todos===[]&&this.todos.push([{id:1,text:"Run a marathon",complete:!1},{id:2,text:"Plant a garden",complete:!1}]),console.log(this.todos)}return e(o,[{key:"_commit",value:function(t){this.onTodoListChanged(t),console.log("Localstorage"),localStorage.setItem("todos",JSON.stringify(t))}},{key:"addTodo",value:function(t){var o={id:this.todos.length>0?this.todos[this.todos.length-1].id+1:1,text:t,complete:!1};this.todos.push(o),this.onTodoListChanged(this.todos),this._commit(this.todos)}},{key:"editTodo",value:function(t,o){this.todos=this.todos.map(function(e){return e.id===t?{id:e.id,text:o,complete:e.complete}:e}),this.onTodoListChanged(this.todos),this._commit(this.todos)}},{key:"deleteTodo",value:function(t){this.todos=this.todos.filter(function(o){return o.id!==t}),this.onTodoListChanged(this.todos),this._commit(this.todos)}},{key:"toggleTodo",value:function(t){this.todos=this.todos.map(function(o){return o.id===t?{id:o.id,text:o.text,complete:!o.complete}:o}),this.onTodoListChanged(this.todos),this._commit(this.todos)}},{key:"bindTodoListChanged",value:function(t){this.onTodoListChanged=t}}]),o}();exports.Model=i;
},{}],"hDRN":[function(require,module,exports) {
"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.View=void 0;var i=function(){function e(){t(this,e),this.app=this.getElement("#root"),this.title=this.createElement("hi"),this.title.textContent="Todos",this.form=this.createElement("form"),this.input=this.createElement("input"),this.input.type="text",this.input.placeholder="Add todo",this.input.name="todo",this.submitButton=this.createElement("button"),this.submitButton.textContent="Submit",this.todoList=this.createElement("ul","todo-list"),this.form.append(this.input,this.submitButton),this.app.append(this.title,this.form,this.todoList),this._temporaryTodoText="",this._initLocalListeners(),console.log(this._temporaryTodoText)}return n(e,[{key:"_initLocalListeners",value:function(){var t=this;this.todoList.addEventListener("input",function(e){"editable"===e.target.className&&(t._temporaryTodoText=e.target.innerText)})}},{key:"createElement",value:function(t,e){var n=document.createElement(t);return e&&n.classList.add(e),n}},{key:"getElement",value:function(t){return document.querySelector(t)}},{key:"_resetInput",value:function(){this.input.value=""}},{key:"displayTodo",value:function(t){for(var e=this;this.todoList.firstChild;)this.todoList.removeChild(this.todoList.firstChild);if(0===t.length){var n=this.createElement("p");n.textContent=" Nothing to do?",this.todoList.append(n)}else t.forEach(function(t){var n=e.createElement("li");n.id=t.id;var i=e.createElement("input");i.type="checkbox",i.checked=t.complete;var o=e.createElement("span");if(o.contentEditable=!0,o.classList.add("editable"),t.complete){var r=e.createElement("s");r.textContent=t.text,o.append(r)}else o.textContent=t.text;var a=e.createElement("button","delete");a.textContent="Delete",n.append(i,o,a),e.todoList.append(n)})}},{key:"bindAddTodo",value:function(t){var e=this;this.form.addEventListener("submit",function(n){n.preventDefault(),e._todoText&&(t(e._todoText),e._resetInput())})}},{key:"bindDeleteTodo",value:function(t){this.todoList.addEventListener("click",function(e){if("delete"===e.target.className){var n=parseInt(e.target.parentElement.id);t(n)}})}},{key:"bindToggleTodo",value:function(t){this.todoList.addEventListener("change",function(e){if("checkbox"===e.target.type){var n=parseInt(e.target.parentElement.id);t(n)}})}},{key:"bindEditTodo",value:function(t){var e=this;this.todoList.addEventListener("focusout",function(n){if(e._temporaryTodoText){var i=parseInt(n.target.parentElement.id);t(i,e._temporaryTodoText),e._temporaryTodoText=""}})}},{key:"_todoText",get:function(){return this.input.value}}]),e}();exports.View=i;
},{}],"niua":[function(require,module,exports) {
"use strict";function o(o,e){if(!(o instanceof e))throw new TypeError("Cannot call a class as a function")}function e(o,e,d){return e in o?Object.defineProperty(o,e,{value:d,enumerable:!0,configurable:!0,writable:!0}):o[e]=d,o}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Controller=void 0;var d=function d(t,i){var n=this;o(this,d),e(this,"onTodoListChanged",function(o){n.view.displayTodo(o)}),e(this,"handleAddTodo",function(o){n.model.addTodo(o)}),e(this,"handleEditTodo",function(o,e){n.model.editTodo(o,e)}),e(this,"handleDeleteTodo",function(o){console.log("delete"),n.model.deleteTodo(o)}),e(this,"handleToggleTodo",function(o){n.model.toggleTodo(o)}),this.model=t,this.view=i,this.view.bindAddTodo(this.handleAddTodo),this.view.bindDeleteTodo(this.handleDeleteTodo),this.view.bindToggleTodo(this.handleToggleTodo),this.view.bindEditTodo(this.handleEditTodo),this.onTodoListChanged(this.model.todos),this.model.bindTodoListChanged(this.onTodoListChanged)};exports.Controller=d;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e=require("./model"),r=require("./view"),i=require("./controller");new i.Controller(new e.Model,new r.View);
},{"./model":"JDu1","./view":"hDRN","./controller":"niua"}]},{},["epB2"], null)
//# sourceMappingURL=main.deadb152.js.map