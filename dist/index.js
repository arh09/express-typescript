"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.get = exports.set = exports.db = exports.sql = exports.connect = void 0;
///<reference path ="typings/globals/jquery/index.d.ts"/> 
var express_1 = __importDefault(require("express"));
var jquery_1 = __importDefault(require("jquery"));
var app = express_1.default();
app.use("/ui", express_1.default.static('./ui/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/token', function (req, res) {
    res.sendFile('dist/token.html', { root: '.' });
});
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.query(exports.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  SELECT * FROM user;\n    "], ["\n  SELECT * FROM user;\n    "]))))];
            case 1:
                users = _a.sent();
                res.send(users);
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.db.query(exports.sql("SELECT * FROM user where user='" + req.params.user + "';"))];
            case 1:
                users = _a.sent();
                res.send(users);
                return [2 /*return*/];
        }
    });
}); });
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log('App listening on port ' + port); });
var $ = jquery_1.default;
var onFocus = /** @class */ (function () {
    function onFocus() {
        var $this = this;
        $this.run = $this.init();
    }
    onFocus.prototype.init = function () {
        var $this = this;
        (function () {
            //            $this.addFocusClass();
        });
        return 0;
    };
    return onFocus;
}());
var running = new onFocus();
exports.connect = require('@databases/sqlite');
exports.sql = require('@databases/sqlite').sql;
exports.db = exports.connect('temp.db');
function prepare() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.db.query(exports.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    DROP TABLE user;\n  "], ["\n    DROP TABLE user;\n  "]))))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, exports.db.query(exports.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    CREATE TABLE IF NOT EXISTS user (\n      user VARCHAR NOT NULL PRIMARY KEY,\n      pass VARCHAR NOT NULL\n    );\n  "], ["\n    CREATE TABLE IF NOT EXISTS user (\n      user VARCHAR NOT NULL PRIMARY KEY,\n      pass VARCHAR NOT NULL\n    );\n  "]))))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var prepared = prepare();
function set(user, pass) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepared];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, exports.db.query(exports.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    INSERT INTO user (user, pass)\n      VALUES (", ", ", ")\n    ON CONFLICT (user) DO UPDATE\n      SET pass=excluded.pass;\n  "], ["\n    INSERT INTO user (user, pass)\n      VALUES (", ", ", ")\n    ON CONFLICT (user) DO UPDATE\n      SET pass=excluded.pass;\n  "])), user, pass))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.set = set;
function get(user) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepared];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, exports.db.query(exports.sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    SELECT pass FROM user WHERE user=", ";\n  "], ["\n    SELECT pass FROM user WHERE user=", ";\n  "])), user))];
                case 2:
                    results = _a.sent();
                    if (results.length) {
                        return [2 /*return*/, results[0].pass];
                    }
                    else {
                        return [2 /*return*/, undefined];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
function remove(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepared];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, exports.db.query(exports.sql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    DELETE FROM user WHERE user=", ";\n  "], ["\n    DELETE FROM user WHERE user=", ";\n  "])), user))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, set('admin', 'admin')];
                case 1:
                    _j.sent();
                    _b = (_a = console).log;
                    return [4 /*yield*/, get('admin')];
                case 2:
                    _b.apply(_a, [_j.sent()]);
                    return [4 /*yield*/, set('admin2', 'admin2')];
                case 3:
                    _j.sent();
                    _d = (_c = console).log;
                    return [4 /*yield*/, get('admin2')];
                case 4:
                    _d.apply(_c, [_j.sent()]);
                    _f = (_e = console).log;
                    return [4 /*yield*/, exports.db.query(exports.sql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  SELECT * FROM user;\n    "], ["\n  SELECT * FROM user;\n    "]))))];
                case 5:
                    _f.apply(_e, [_j.sent()]);
                    return [4 /*yield*/, remove('admin2')];
                case 6:
                    _j.sent();
                    _h = (_g = console).log;
                    return [4 /*yield*/, exports.db.query(exports.sql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  SELECT * FROM user;\n    "], ["\n  SELECT * FROM user;\n    "]))))];
                case 7:
                    _h.apply(_g, [_j.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
run().catch(function (ex) {
    console.error(ex.stack);
    process.exit(1);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
