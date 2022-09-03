let express=require("express");
let app=express();
let hbs=require("hbs");
var bodyParser = require('body-parser')
let mysql=require("mysql");
let con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"mysql",
  database:"saheb"
})
let env=require("dotenv").config()

let port=process.env.PORT||8080;

let path=require("path")
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use(express.static(path.join(__dirname,"Web")));
//app.set("views",path.join(__dirname),"views");
con.connect((err)=>{
   if(err){
     throw err;
   }
   else{
     console.log("connect")
   }
});
  
 
app.set("view engine","hbs")
app.get("/",(req,res)=>{
  res.render("home.hbs",{ti:"muju"})
})
app.get("/order",(req,res)=>{
  res.render("order.hbs");
  
})
app.get("/about",(req,res)=>{
  res.render("about.hbs")
})
hbs.registerPartials(path.join(__dirname,"./views"))

app.post("/",(req,res)=>{
  let name=req.body.name;
  let email=req.body.email;
  let number=req.body.number;
  let pass=req.body.pass;
 ////////////
 
     
   
   
   let sql="insert into info(name,email,number,pass) value('"+name+"','"+email+"','"+number+"','"+pass+"')";
   con.query(sql,(err,result)=>{
     if(err)throw err;
     else{
      res.send("Thanks for ordering")
     }
   })
  
 
 
})
app.listen(port)