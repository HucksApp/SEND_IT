const newform = document.querySelector('form.new-form');


newform.addEventListener('submit',(e)=>{
    e.preventDefault();


    const username = newform.username.value;
    const  phoneNumber= newform.phoneNumber.value;
    const  houseAddress= newform.houseAddress.value;
    const password= newform.password.value;
    const email= newform.email.value;

        const data = {username,phoneNumber,houseAddress,password,email}
            document.getElementById('supb').disabled = true;
        fetch('https://s-i-api.herokuapp.com/api/v1/new_user',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(data)
        })
                        .then((res)=>{
                            return res.json();
                        }).then((rdata)=>{
                            document.getElementById('supb').disabled = false;
                                    console.log(rdata)
                                if(rdata.valid == false){
                                        window.alert(rdata.message);
                                        window.location.assign('./user_signin.html')
                                }else if( rdata.token && rdata.valid == true){
                                    sessionStorage.setItem( 'token', rdata.token );

                                    window.location.assign('./account.html');
                                    window.alert("ACCOUNT CREATED SUCCESSFULLY");
                                }

                        })


})
