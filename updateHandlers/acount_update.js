window.addEventListener('load',(e)=>{

const username1 = document.getElementById('updu');
const houseAddress = document.getElementById('upda');
const phoneNumber = document.getElementById('updpn');
const id = document.getElementById('updi');
const  password = document.getElementById('updp');
const username2 = document.getElementById('updun');
const orderCount = document.getElementById('updo');
const token = sessionStorage.getItem('token');


if(!token){
    window.alert('YOU ARE NOT LOGGED IN');
    location.replace('./user_signin.html')
}else{



    console.log(token)
fetch('https://s-i-api.herokuapp.com/api/v1/account',{
        method:"GET",
        headers:{
            Authorization : token
        }
}).then((response)=>{
    return response.json();
}).then((data)=>{
    console.log(data);
    console.log(data[0])
    const { email,phone_number,username,user_password,address,order_counts } = data[0];
    sessionStorage.setItem('username', username);

    username1.textContent= username;
    houseAddress.textContent=address;
    phoneNumber.textContent=phone_number;
    id.textContent=email;
    password.textContent=user_password;
    username2.textContent=username;
    orderCount.textContent=order_counts





}).catch(err=> console.log(err))
}
console.log(token)

})