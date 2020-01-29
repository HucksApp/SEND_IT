
const formOldUser = document.querySelector('form.user');
const formAdmin = document.querySelector('form.admin');


formOldUser.addEventListener('submit',(e)=>{
e.preventDefault();

const uData = {
    email: formOldUser.email.value,
    password: formOldUser.password.value 
};
document.getElementById('sbu').disabled=true;
fetch( 'https://s-i-api.herokuapp.com/api/v1/old_user' ,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(uData)
            }).then((res)=>{
                console.log(res);
                return res.json();
            })
            .then((data)=>{
                document.getElementById('sbu').disabled=false;
                console.log(data.token);
                console.log(data)
                if (data.valid == false){
                    toast(data.message)
                }else if(data.valid == true){

                    sessionStorage.setItem( 'token', data.token );
                    window.location.assign('./account.html');
                }

                }
            )


});


formAdmin.addEventListener('submit',(e)=>{
e.preventDefault();
console.log('fired!!!');
        const data = {
                    email: formAdmin.email.value,
                    password: formAdmin.password.value
        };
        document.getElementById('asb').disabled=true;
fetch('https://s-i-api.herokuapp.com/api/v1/admin',{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data)
}).then((res)=>{
    return res.json()
}).then((data)=>{
    document.getElementById('asb').disabled=false;
            if (data.valid == false){
                toast(data.message)
            }   else if (data.valid == true){
                sessionStorage.setItem('adminToken', data.token);
                console.log(data);
                window.location.assign('./admin.html');

            }   
})

})




const toast =(message)=>{
    const options={
                style:{
                    main:{
                        background: "red",
                        color: "white"
                    }
                },
                settings:{
                    duration: 4000
                }
    }

return iqwerty.toast.Toast(message, options)


}

