// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model() {
    _classCallCheck(this, Model);

    // The state of the model, an array of to projects, prepopulated with some data
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.todos = [{
      id: 1,
      text: 'Run a marathon',
      complete: false
    }, {
      id: 2,
      text: 'Plant a garden',
      complete: false
    }];
    console.log(this.todos);
  }

  _createClass(Model, [{
    key: "_commit",
    value: function _commit(todos) {
      this.onTodoListChanged(todos);
      console.log('Localstorage');
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, {
    key: "addTodo",
    value: function addTodo(todoText) {
      var todo = {
        id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
        text: todoText,
        complete: false
      };
      this.todos.push(todo);
      this.onTodoListChanged(this.todos);

      this._commit(this.todos);
    }
  }, {
    key: "editTodo",
    value: function editTodo(id, updatedText) {
      this.todos = this.todos.map(function (todo) {
        return todo.id === id ? {
          id: todo.id,
          text: updatedText,
          complete: todo.complete
        } : todo;
      });
      this.onTodoListChanged(this.todos);

      this._commit(this.todos);
    }
  }, {
    key: "deleteTodo",
    value: function deleteTodo(id) {
      this.todos = this.todos.filter(function (todo) {
        return todo.id !== id;
      });
      this.onTodoListChanged(this.todos);

      this._commit(this.todos);
    }
  }, {
    key: "toggleTodo",
    value: function toggleTodo(id) {
      this.todos = this.todos.map(function (todo) {
        return todo.id === id ? {
          id: todo.id,
          text: todo.text,
          complete: !todo.complete
        } : todo;
      });
      this.onTodoListChanged(this.todos);

      this._commit(this.todos);
    }
  }, {
    key: "bindTodoListChanged",
    value: function bindTodoListChanged(callback) {
      this.onTodoListChanged = callback;
    }
  }]);

  return Model;
}();

exports.Model = Model;
},{}],"view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View = /*#__PURE__*/function () {
  function View() {
    _classCallCheck(this, View);

    // The root element
    this.app = this.getElement('#root'); // The title of the app

    this.title = this.createElement('hi');
    this.title.textContent = 'Todos'; // Create the form element

    this.form = this.createElement('form');
    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add todo';
    this.input.name = 'todo';
    this.submitButton = this.createElement('button');
    this.submitButton.textContent = 'Submit';
    this.todoList = this.createElement('ul', 'todo-list');
    this.form.append(this.input, this.submitButton);
    this.app.append(this.title, this.form, this.todoList);
    this._temporaryTodoText = '';

    this._initLocalListeners();

    console.log(this._temporaryTodoText);
  }

  _createClass(View, [{
    key: "_initLocalListeners",
    value: function _initLocalListeners() {
      var _this = this;

      this.todoList.addEventListener('input', function (e) {
        if (e.target.className === 'editable') {
          _this._temporaryTodoText = e.target.innerText;
        }
      });
    }
  }, {
    key: "createElement",
    value: function createElement(tag, className) {
      var element = document.createElement(tag);

      if (className) {
        element.classList.add(className);
      }

      return element;
    }
  }, {
    key: "getElement",
    value: function getElement(selector) {
      return document.querySelector(selector);
    }
  }, {
    key: "_resetInput",
    value: function _resetInput() {
      this.input.value = '';
    }
  }, {
    key: "displayTodo",
    value: function displayTodo(todos) {
      var _this2 = this;

      while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild);
      }

      if (todos.length === 0) {
        var p = this.createElement('p');
        p.textContent = ' Nothing to do?';
        this.todoList.append(p);
      } else {
        todos.forEach(function (todo) {
          var li = _this2.createElement('li');

          li.id = todo.id;

          var checkbox = _this2.createElement('input');

          checkbox.type = 'checkbox';
          checkbox.checked = todo.complete;

          var span = _this2.createElement('span');

          span.contentEditable = true;
          span.classList.add('editable');

          if (todo.complete) {
            var strike = _this2.createElement('s');

            strike.textContent = todo.text;
            span.append(strike);
          } else {
            span.textContent = todo.text;
          }

          var deleteButton = _this2.createElement('button', 'delete');

          deleteButton.textContent = 'Delete';
          li.append(checkbox, span, deleteButton);

          _this2.todoList.append(li);
        });
      }
    }
  }, {
    key: "bindAddTodo",
    value: function bindAddTodo(handler) {
      var _this3 = this;

      this.form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (_this3._todoText) {
          handler(_this3._todoText);

          _this3._resetInput();
        }
      });
    }
  }, {
    key: "bindDeleteTodo",
    value: function bindDeleteTodo(handler) {
      this.todoList.addEventListener('click', function (e) {
        if (e.target.className === 'delete') {
          var id = parseInt(e.target.parentElement.id);
          handler(id);
        }
      });
    }
  }, {
    key: "bindToggleTodo",
    value: function bindToggleTodo(handler) {
      this.todoList.addEventListener('change', function (e) {
        if (e.target.type === 'checkbox') {
          var id = parseInt(e.target.parentElement.id);
          handler(id);
        }
      });
    }
  }, {
    key: "bindEditTodo",
    value: function bindEditTodo(handler) {
      var _this4 = this;

      this.todoList.addEventListener('focusout', function (e) {
        if (_this4._temporaryTodoText) {
          var id = parseInt(e.target.parentElement.id);
          handler(id, _this4._temporaryTodoText);
          _this4._temporaryTodoText = '';
        }
      });
    }
  }, {
    key: "_todoText",
    get: function get() {
      return this.input.value;
    }
  }]);

  return View;
}();

exports.View = View;
},{}],"controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Controller = function Controller(model, view) {
  var _this = this;

  _classCallCheck(this, Controller);

  _defineProperty(this, "onTodoListChanged", function (todos) {
    _this.view.displayTodo(todos);
  });

  _defineProperty(this, "handleAddTodo", function (todoText) {
    _this.model.addTodo(todoText);
  });

  _defineProperty(this, "handleEditTodo", function (id, todoText) {
    _this.model.editTodo(id, todoText);
  });

  _defineProperty(this, "handleDeleteTodo", function (id) {
    console.log('delete');

    _this.model.deleteTodo(id);
  });

  _defineProperty(this, "handleToggleTodo", function (id) {
    _this.model.toggleTodo(id);
  });

  this.model = model;
  this.view = view;
  this.view.bindAddTodo(this.handleAddTodo);
  this.view.bindDeleteTodo(this.handleDeleteTodo);
  this.view.bindToggleTodo(this.handleToggleTodo);
  this.view.bindEditTodo(this.handleEditTodo);
  this.onTodoListChanged(this.model.todos);
  this.model.bindTodoListChanged(this.onTodoListChanged);
};

exports.Controller = Controller;
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _model = require("./model");

var _view = require("./view");

var _controller = require("./controller");

new _controller.Controller(new _model.Model(), new _view.View());
},{"./model":"model.js","./view":"view.js","./controller":"controller.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14725" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map