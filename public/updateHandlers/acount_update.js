window.addEventListener('load',(e)=>{

const username1 = document.getElementById('updu');
const houseAddress = document.getElementById('upda');
const phoneNumber = document.getElementById('updpn');
const id = document.getElementById('updi');
const  password = document.getElementById('updp');
const username2 = document.getElementById('updun');
const orderCount = document.getElementById('updo');


fetch('/account',{
        method:"GET",
        headers:{
            "Accept":"text/plain, application/json, */*",
            "Content-Type":"application/json"
        }
}).then((response)=>{
    return response.json();
}).then((data)=>{
    console.log(data[0])
    const {email,phone_number,username,user_password,address,order_counts}= data[0];
    username1.textContent= username;
    houseAddress.textContent=address;
    phoneNumber.textContent=phone_number;
    id.textContent=email;
    password.textContent=user_password;
    username2.textContent=username;
    orderCount.textContent=order_counts





}).catch(err=> console.log(err))



})