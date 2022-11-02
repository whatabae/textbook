import React,{useState, useEffect} from "react";
import './App.css';

const serverURL = "http://localhost:65020/users";
const serverURL_check = "http://localhost:65020/check";

function App(){
    const[userData, setUserData] =useState(null);
    const[userCheck, setCheck] = useState(true);

    const getUserDate = ()=>{ //get
        fetch(serverURL)
        .then((res)=>res.json())
        .then((data)=>setUserData(data))
        .then(console.log(userData))
    }

    // const getChecked = ()=>{ //get
    //     fetch(serverURL_check)
    //     .then((res)=>res.json())
    //     .then((data)=>setCheck(data))
    //     .then(console.log(userCheck))
    // }

    useEffect(getUserDate, []);
    // useEffect(getChecked, []);

    const onSubmitHandler = (event)=>{
        event.preventDefault();
        const name = event.target.name.value;
        const id = event.target.id.value;
        const passwd = event.target.passwd.value;
        console.log("Submit 버튼 클릭후 서버로 POST 전송");

        fetch(serverURL, { //post
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({name,id,passwd}),
        })
        .then(getUserDate())
        
    
    }

    const onChecked = (event)=>{ 
        event.preventDefault();
        const id = event.target.id.value;
        const passwd = event.target.passwd.value;

        fetch(serverURL_check, { //post
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({id,passwd}),
        })
        .then((response) => response.json())
        .then((result) => console.log(result));
    }
    
    return(
        <>
            <div>
                <h2>회원 등록</h2>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" name="name" placeholder="이름"></input>
                    <input type="text" name="id" placeholder="아이디"></input>
                    <input type="text" name="passwd" placeholder="암호"></input>
                    <button type="submit"> 등록 </button>
                </form>
            </div>
            <p></p>
            <div>
                <h2>회원 확인</h2>
                <form onSubmit={onChecked}>
                    <input type="text" name="id" placeholder="아이디"></input>
                    <input type="text" name="passwd" placeholder="암호"></input>
                    <button type="submit">확인</button>
                </form>
                { userCheck ? <p> 회원으로 확인되었습니다. </p> : <p>그런 회원은 없습니다.</p>}
            </div>
            <p></p>
            <div>
                <h2>회원 목록</h2>
                <ol>
                    {(userData===null)?(<p>서버에서 데이터를 가져오는 중 ....</p>
                    ) :(
                        userData.map((user, i)=>(
                            <li key={user.keyid}>{user.name} {user.id} {user.passwd}</li>
                        ))
                    )}
                </ol>
            </div>
        </>
    )
}

export default App;