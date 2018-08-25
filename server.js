
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('bin'));


class Table {
    constructor(name,email,phone) {
        this.routeName = name
        this.name = name.toLowerCase().replace(/^./, e=>e.toUpperCase()),
        this.email = email,
        this.phone = phone?phone:null,
        this.uniqueId = Math.floor(Math.random()*100)
    };
};

const tables = [
    new Table("webb Family", "test@test.com"),
    new Table("nancy Family", "test@test.com"),
    new Table("walt Family", "test@test.com")
];


app.get("/", (req, res)=> {
<<<<<<< HEAD
  res.sendFile(path.join(__dirname, "home.html"));
=======
    res.sendFile(path.join(__dirname, "/bin/Home.html"));
    // res.sendFile(path.join(__dirname, "/bin/style.css"));
    // res.sendFile(path.join(__dirname, "/bin/reset.css"));
>>>>>>> 5ccc1e2ed9df24d9afe909ea22acc685c0ad2d1c
});

app.get("/reserve", (req, res)=> {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/table", (req, res)=> {
  res.sendFile(path.join(__dirname, "/bin/table.html"));
});

app.get("/api/tables", (req, res)=> {
  return res.json(tables);
});

app.get("/api/tables/:table", (req, res)=> {
  const chosen = req.params.table;

  return res.json(tables.reduce((accu,e)=>{
      e.routeName==chosen?accu.push(e):null;
      return accu;
  },[])[0]);

  return res.json(false);
});

app.post("/api/tables", (req, res)=> {
  const newTable = req.body;
  newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  tables.push(newTable);
  res.json(newTable);
});

app.listen(PORT, ()=> {
  console.log("App listening on PORT " + PORT);
});
