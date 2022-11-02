const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.static(path.join(__dirname,'textbook/build')));
app.use(bodyParser.urlencoded({extended:false}));

var keyid=3;
var id_pw = false;

var userList = [
    {keyid:1, name :"홍길동", id:"kdhong", passwd:"1111"},
    {keyid:2, name :"박길동", id:"kdpark", passwd:"1111"}
];

const mainPage = (req, res)=>{
    res.sendFile(path.join(__dirname,'textbook/build/index.html'));
}

const listUsers = (req, res) =>{
    console.log("회원 명단 조회요청을 받았으며, 리엑트에게 명단을 보냅니다.")
    res.json(userList);
}
// const send_check =(req, res) =>{
//     console.log("맞는지 틀린지 전송");
//     res.json(id_pw);
// }

const addUser = (req, res) =>{
    const {name, id, passwd} = req.body;
    console.log(id);
    userList.push({keyid:keyid++,name,id,passwd});
    console.log("회원 등록요청을 완료하였으며, 이를 반영한 전체목록입니다.");
    userList.map((user,i)=>{
        console.log(user.keyid+"."+user.name+"."+user.id+"."+user.passwd);
    })
    return res.send('success');
}

const check =(req, res) => {
    const {id, passwd} = req.body;
    console.log(id, passwd);
    var checked = userList.filter((item) => item.id == id);

    console.log(checked[0])
    console.log(checked[0].id, checked[0].passwd);

    if(checked[0].id == id && checked[0].passwd==passwd){
        id_pw =true;
        console.log(id_pw);
    }else{
        id_pw = false;
        console.log(id_pw);    
    }
    return res.send(id_pw);
}

app.get("/", mainPage);
app.get("/users", listUsers);
app.post("/users", addUser);

// app.get("/check", send_check);
app.post("/check", check);

app.listen(65020, ()=>{
    console.log("---------------------------------");
    console.log("(리액트연동용) 웹 서버 실행중");
    console.log("접속주소 : http://localhost:65020/");
    console.log("---------------------------------");
});
