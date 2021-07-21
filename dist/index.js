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
///<reference path ="typings/globals/jquery/index.d.ts"/> 
var express_1 = __importDefault(require("express"));
var jquery_1 = __importDefault(require("jquery"));
var app = express_1.default();
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});
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
var connect = require('@databases/sqlite');
var sql = require('@databases/sqlite').sql;
var db = connect('temp.db');
function prepare() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.query(sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    DROP TABLE app_data;\n  "], ["\n    DROP TABLE app_data;\n  "]))))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.query(sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    CREATE TABLE IF NOT EXISTS app_data (\n      user VARCHAR NOT NULL PRIMARY KEY,\n      pass VARCHAR NOT NULL\n    );\n  "], ["\n    CREATE TABLE IF NOT EXISTS app_data (\n      user VARCHAR NOT NULL PRIMARY KEY,\n      pass VARCHAR NOT NULL\n    );\n  "]))))];
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
                    return [4 /*yield*/, db.query(sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    INSERT INTO app_data (user, pass)\n      VALUES (", ", ", ")\n    ON CONFLICT (user) DO UPDATE\n      SET pass=excluded.pass;\n  "], ["\n    INSERT INTO app_data (user, pass)\n      VALUES (", ", ", ")\n    ON CONFLICT (user) DO UPDATE\n      SET pass=excluded.pass;\n  "])), user, pass))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function get(user) {
    return __awaiter(this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepared];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.query(sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    SELECT pass FROM app_data WHERE user=", ";\n  "], ["\n    SELECT pass FROM app_data WHERE user=", ";\n  "])), user))];
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
function remove(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prepared];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.query(sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    DELETE FROM app_data WHERE user=", ";\n  "], ["\n    DELETE FROM app_data WHERE user=", ";\n  "])), user))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var runCount, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, get('run_count')];
                case 1:
                    runCount = _b.apply(_a, [(_o.sent()) || '0']);
                    console.log('run count =', runCount);
                    return [4 /*yield*/, set('User0', JSON.stringify(runCount + 1))];
                case 2:
                    _o.sent();
                    _d = (_c = console).log;
                    return [4 /*yield*/, get('pass')];
                case 3:
                    _d.apply(_c, [_o.sent()]);
                    return [4 /*yield*/, set('User1', 'Forbes')];
                case 4:
                    _o.sent();
                    _f = (_e = console).log;
                    return [4 /*yield*/, get('pass')];
                case 5:
                    _f.apply(_e, [_o.sent()]);
                    return [4 /*yield*/, set('User2', 'Forbes Lindesay')];
                case 6:
                    _o.sent();
                    _h = (_g = console).log;
                    return [4 /*yield*/, get('pass')];
                case 7:
                    _h.apply(_g, [_o.sent()]);
                    _k = (_j = console).log;
                    return [4 /*yield*/, db.query(sql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  SELECT * FROM app_data;\n    "], ["\n  SELECT * FROM app_data;\n    "]))))];
                case 8:
                    _k.apply(_j, [_o.sent()]);
                    return [4 /*yield*/, remove('User2')];
                case 9:
                    _o.sent();
                    _m = (_l = console).log;
                    return [4 /*yield*/, db.query(sql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  SELECT * FROM app_data;\n    "], ["\n  SELECT * FROM app_data;\n    "]))))];
                case 10:
                    _m.apply(_l, [_o.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
run().catch(function (ex) {
    console.error(ex.stack);
    process.exit(1);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
