const newform = document.querySelector('form.new-form');


newform.addEventListener('submit',(e)=>{
    e.preventDefault();

        const data = {
            username: newform.username.value,
            phoneNumber: newform.phoneNumber.value,
            houseAddress: newform.houseAddress.value,
            password: newform.password.value,
            email: newform.email.value
        };

        fetch('https://s-i-api.herokuapp.com/api/v1/new_user',{

                                method:"POST",
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify({data})
                })
                                .then((res)=>{
                                    return res.json();
                                }).then((data)=>{
                                    console.log(data);
                                        if(data.valid == false){
                                                window.alert(data.message);
                                               /* window.location.replace('./user_signin.html')*/
                                        }else if(data.valid == true){

                                           /* window.location.replace('./account.html');*/
                                        }

                                })


        })
