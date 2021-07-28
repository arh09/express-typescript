///<reference path ="typings/globals/jquery/index.d.ts"/> 
import express from "express";
import jQuery from "jquery";
const app = express();

app.use("/ui", express.static('./ui/'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/token', function(req, res) {
  res.sendFile('dist/token.html', { root: '.' })
});

app.get('/users', async (req, res) => {
  var users = await db.query(sql`
  SELECT * FROM user;
    `);
  res.send(users)
});

app.get('/users/:user', async (req, res) => {
  var users = await db.query(sql("SELECT * FROM user where user='" +req.params.user+"';" ));
  res.send(users)
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

export const connect = require('@databases/sqlite');
export const {sql} = require('@databases/sqlite');

export const db = connect('temp.db');

async function prepare() {  
  await db.query(sql`
    DROP TABLE user;
  `);
  await db.query(sql`
    CREATE TABLE IF NOT EXISTS user (
      user VARCHAR NOT NULL PRIMARY KEY,
      pass VARCHAR NOT NULL
    );
  `);
}
const prepared = prepare();

export async function set(user:string, pass:string) {
  await prepared;
  await db.query(sql`
    INSERT INTO user (user, pass)
      VALUES (${user}, ${pass})
    ON CONFLICT (user) DO UPDATE
      SET pass=excluded.pass;
  `);
}

export async function get(user:string) {
  await prepared;
  const results = await db.query(sql`
    SELECT pass FROM user WHERE user=${user};
  `);
  if (results.length) {
    return results[0].pass;
  } else {
    return undefined;
  }
}

export async function remove(user:string) {
  await prepared;
  await db.query(sql`
    DELETE FROM user WHERE user=${user};
  `);
}
async function run() {
  await set('admin', 'admin');
  console.log(await get('admin'));
  await set('admin2', 'admin2');
  console.log(await get('admin2'));
  console.log(await db.query(sql`
  SELECT * FROM user;
    `));
  await remove('admin2');
  console.log(await db.query(sql`
  SELECT * FROM user;
    `));
}
run().catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
