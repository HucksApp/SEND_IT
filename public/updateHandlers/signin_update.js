
const formOldUser = document.querySelector('form.user');
const formAdmin = document.querySelector('form.admin');


formOldUser.addEventListener('submit',(e)=>{
e.preventDefault();

const uData = {
    email: formOldUser.email.value,
    password: formOldUser.password.value 
};

fetch('/old_user',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(uData)
            }).then((res)=>{
                console.log(res);
                return res.json();
            })
            .then((data)=>{
                console.log(data)
                if (data.valid == false){
                    window.alert(data.message);
                }else if(data.valid == true){
                        window.location.replace('./account.html')
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

fetch('/admin',{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
}).then((res)=>{
    return res.json()
}).then((data)=>{
            if (data.valid == false){
                window.alert(data.message)
            }   else if (data.valid == true){

                window.location.replace('./admin.html');

            }   
})

})



