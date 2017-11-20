define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.users = users;
      this.message = 'Home';
      this.showLogin = true;
    }

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";

      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(this.user);
                _context.next = 3;
                return this.users.save(this.user);

              case 3:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', '../resources/data/todos', 'aurelia-router', 'aurelia-auth'], function (exports, _aureliaFramework, _todos, _aureliaRouter, _aureliaAuth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.List = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService, _todos.ToDos), _dec(_class = function () {
        function List(router, auth, todos) {
            _classCallCheck(this, List);

            this.router = router;
            this.todos = todos;
            this.auth = auth;

            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.priorities = ['Low', 'Medium', 'High', 'Critical'];
            this.showList = true;
        }

        List.prototype.activate = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.todos.getUserTodos(this.user._id);

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function activate() {
                return _ref.apply(this, arguments);
            }

            return activate;
        }();

        List.prototype.createTodo = function createTodo() {
            this.todoObj = {
                todos: "",
                description: "",
                dateDue: new Date(),
                userId: this.user._id,
                priority: this.priorities[0]
            };
            this.showList = false;
        };

        List.prototype.saveTodo = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                var response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.todoObj) {
                                    _context2.next = 6;
                                    break;
                                }

                                _context2.next = 3;
                                return this.todos.save(this.todoObj);

                            case 3:
                                response = _context2.sent;

                                if (response.error) {
                                    alert("There was an error creating the ToDo");
                                } else {}
                                this.showList = true;

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function saveTodo() {
                return _ref2.apply(this, arguments);
            }

            return saveTodo;
        }();

        List.prototype.back = function back() {
            this.showlist = true;
        };

        List.prototype.logout = function logout() {
            sessionStorage.removeItem('user');
            this.auth.logout();
        };

        return List;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataServices = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function DataServices(http) {
            var _this = this;

            _classCallCheck(this, DataServices);

            this.httpClient = http;

            this.BASE_URL = "http://localhost:5000/api/";

            this.httpClient.configure(function (config) {
                config.withBaseUrl(_this.BASE_URL).withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                }).withInterceptor({
                    request: function request(_request) {
                        console.log('Requesting ' + _request.method + ' ' + _request.url);
                        return _request;
                    },
                    response: function response(_response) {
                        console.log('Received ' + _response.status + ' ' + _response.url);
                        return _response;
                    }
                });
            });
        }

        DataServices.prototype.get = function get(url) {
            return this.httpClient.fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.post = function post(content, url) {
            return this.httpClient.fetch(url, {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.put = function put(content, url) {
            return this.httpClient.fetch(url, {
                method: 'put',
                body: (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.delete = function _delete(url) {
            return this.httpClient.fetch(url, {
                method: 'delete'
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        return DataServices;
    }()) || _class);
});
define('resources/data/todos',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ToDos = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ToDos = exports.ToDos = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function ToDos(data) {
            _classCallCheck(this, ToDos);

            this.data = data;
            this.TODO_SERVICE = 'todos';
            this.todosArray = new Array();
        }

        ToDos.prototype.getUserTodos = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                var response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.data.get(this.TODO_SERVICE + "/user/" + id);

                            case 2:
                                response = _context.sent;

                                if (!response.error && !response.message) {
                                    this.todosArray = response;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getUserTodos(_x) {
                return _ref.apply(this, arguments);
            }

            return getUserTodos;
        }();

        ToDos.prototype.save = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(todo) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!todo) {
                                    _context2.next = 6;
                                    break;
                                }

                                _context2.next = 3;
                                return this.data.post(todo, this.TODO_SERVICE);

                            case 3:
                                serverResponse = _context2.sent;

                                if (!serverResponse.error) {
                                    this.todosArray.push(serverResponse);
                                }
                                return _context2.abrupt('return', serverResponse);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function save(_x2) {
                return _ref2.apply(this, arguments);
            }

            return save;
        }();

        return ToDos;
    }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;

            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view></template>"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1><compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose><compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\r\n    margin-right: 10px;\r\n    }\r\n\r\n    .leftMargin {\r\n        margin-left: 10px;\r\n    }\r\n\r\n    \r\n    "; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><compose show.bind=\"showList\" view=\"./components/todoList.html\"></compose><compose show.bind=\"!showList\" view=\"./components/todoForm.html\"></compose></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div class=\"col-md-3\"><form id=\"form\"><div id=\"errorMsg\" innerhtml.bind=\"loginError\"></div><div class=\"form-group\"><label for=\"email\">Email</label><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"password\">Password</label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div><button class=\"btn btn-default\" click.trigger=\"login()\">Login</button> <a href=\"\" class=\"text-muted\" click.trigger=\"showRegister()\">Register</a></form></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template>First Name: <input value.bind=\"user.firstName\"> Last Name: <input value.bind=\"user.lastName\"> Email: <input value.bind=\"user.email\"> Password: <input value.bind=\"user.password\"> <span>${registerError}</span><button click.trigger=\"save()\">Save</button></template>"; });
define('text!modules/components/todoForm.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group topMargin\"><label for=\"todoInput\">Todo *</label><input value.bind=\"todoObj.todo\" type=\"text\" class=\"form-control\" id=\"todoInput\" aria-describedby=\"todoHelp\" placeholder=\"Enter ToDo\"> <small id=\"todoHelp\" class=\"form-text text-muted\">A short name for the ToDo.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"todoObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A longer description if required.</small></div><div class=\"form-group\"><label for=\"priorityInput\">Priority</label><select value.bind=\"todoObj.priority\" class=\"form-control\" id=\"exampleFormControlSelect2\"><option repeat.for=\"priority of priorities\" value.bind=\"priority\"> ${priority}</option></select><small id=\"priorityHelp\" class=\"form-text text-muted\">How urgent is this?</small></div><div class=\"form-group\"><label for=\"dueDateInput\">Due Date *</label><input type=\"date\" class=\"form-control\" value.bind=\"todoObj.dateDue\"> <small id=\"dueDateHelp\" class=\"form-text text-muted\">The date to ToDo is due.</small></div><button click.trigger=\"saveTodo()\" class=\"btn btn-primary topMargin\">Save</button></form></div></template>"; });
define('text!modules/components/todoList.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"></div><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createTodo()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"todos.todosArray.length\"><table class=\"table\"><thead><tr><th>ToDo</th></tr></thead><tbody><tr repeat.for=\"todo of todos.todosArray\"><th>${todo.todo}</th></tr></tbody></table></div><div show.bind=\"!todos.todosArray.length\"><h2>Apparently, you don't have anything to do!</h2></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map