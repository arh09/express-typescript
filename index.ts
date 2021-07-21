///<reference path ="typings/globals/jquery/index.d.ts"/> 
import express from "express";
import jQuery from "jquery";
const app = express();

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname })
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log('App listening on port '+port));

var $ = jQuery;

class onFocus {

    private run: number | undefined;

    constructor(){
        var $this = this;
        $this.run = $this.init();
    }

    public init():number {
        var $this = this;
        (function () {
//            $this.addFocusClass();
        });
        return 0;
    }
//    private addFocusClass():void {
//        $(".form-control").focus(function () {
//           $(this).prev().addClass("on-focus");
//        }).focusout(function () {
//            $(".form-label").removeClass("on-focus");
//        })
//    }
}

var running = new onFocus();

const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');

const db = connect('temp.db');

async function prepare() {  
  await db.query(sql`
    DROP TABLE app_data;
  `);
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS app_data (
      user VARCHAR NOT NULL PRIMARY KEY,
      pass VARCHAR NOT NULL
    );
  `);
}
const prepared = prepare();

async function set(user:string, pass:string) {
  await prepared;
  await db.query(sql`
    INSERT INTO app_data (user, pass)
      VALUES (${user}, ${pass})
    ON CONFLICT (user) DO UPDATE
      SET pass=excluded.pass;
  `);
}

async function get(user:string) {
  await prepared;
  const results = await db.query(sql`
    SELECT pass FROM app_data WHERE user=${user};
  `);
  if (results.length) {
    return results[0].pass;
  } else {
    return undefined;
  }
}

async function remove(user:string) {
  await prepared;
  await db.query(sql`
    DELETE FROM app_data WHERE user=${user};
  `);
}

async function run() {
  const runCount = JSON.parse((await get('run_count')) || '0');
  console.log('run count =', runCount);
  await set('User0', JSON.stringify(runCount + 1));
  console.log(await get('pass'));
  await set('User1', 'Forbes');
  console.log(await get('pass'));
  await set('User2', 'Forbes Lindesay');
  console.log(await get('pass'));
  console.log(await db.query(sql`
  SELECT * FROM app_data;
    `));
  await remove('User2');
  console.log(await db.query(sql`
  SELECT * FROM app_data;
    `));
}
run().catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
