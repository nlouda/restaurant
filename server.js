
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

class Table {
    constructor(name,time,number, phoneNumber) {
        this.routeName = name
        this.name = name.toLowerCase().replace(/^./, e=>e.toUpperCase()),
        this.time = time,
        this.number = number,
        this.phoneNumber = phoneNumber?phoneNumber:null
    }
}

const tables = [
    new Table("webbFamily", "7pm", 5),
    new Table("nancyFamily", "8pm", 6),
    new Table("waltFamily", "6pm", 4)
];

console.log(tables);

app.get("/", (req, res)=> {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", (req, res)=> {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/table", (req, res)=> {
  res.sendFile(path.join(__dirname, "table.html"));
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
