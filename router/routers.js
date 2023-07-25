const express=require("express");
const router=express.Router();
const connection=require("../db/dbconnect");

router.get("/employees",function(req,resp){
   connection.query("select * from employee",(err,data,fields)=>{
    if(err){
        resp.status(500).send("no data found"+JSON.stringify(err));
    }
    else{
      
        resp.render("index",{empdata:data})
    }
   })
})

router.get("/displayaddform",(req,resp)=>{
    resp.render("add-emp")

})

 
router.post("/insertEmployee",(req,resp)=>{
    var empid=req.body.empid
    var ename=req.body.ename;
    var sal=req.body.sal;
    connection.query("insert into employee values(?,?,?)",[empid,ename,sal],(err,result)=>{
        if(err){
            resp.status(500).send("data not added"+JSON.stringify(err));
        }
        else{
            resp.redirect("/employees")
        }
    })
})


router.get("/edit/:eid",(req,resp)=>{
    console.log("empid ",req.params.eid)
   connection.query("select * from employee where empid=?",[req.params.eid],(err,data,fields)=>{
    console.log(data);
    if(err){
        resp.status(500).send("data not added"+JSON.stringify(err));
    }else{
        resp.render("update-emp",{emp:data[0]});
    }

   })
})



router.post("/updateEmployee",(req,resp)=>{
    var empid=req.body.empid
    var ename=req.body.ename;
    var sal=req.body.sal;
  connection.query("update employee set ename=?,sal=? where empid=?",[ename,sal,empid],(err,result)=>{
    if(err){
        resp.status(500).send("data not added"+JSON.stringify(err));
    }else{
        resp.redirect("/employees")
    }

  })
})
router.get("/delete/:eid",(req,resp)=>{
    connection.query("delete from employee where empid=?",[req.params.eid],(err,result)=>{
        if(err){
            resp.status(500).send("data not added"+JSON.stringify(err));
        }else{
            resp.redirect("/employees")
        }
    })

})



module.exports=router;