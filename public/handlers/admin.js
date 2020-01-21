const formOne= document.querySelector('.loc');
const formTwo= document.querySelector('.sta');
const btnOne = document.querySelector('.update-location');
const btnTwo = document.querySelector('.status');
const sub_destn= document.querySelector('.sub_destn');
const sub_status= document.querySelector('.sub_status');
const logout = document.getElementById('logout');









btnOne.addEventListener('click',(e)=>{
    console.log('here');
if(formOne.classList.contains('show')){
    formOne.classList.remove('show');
}else{
    formOne.classList.add('show')
}
});

btnTwo.addEventListener('click',(e)=>{
if(formTwo.classList.contains('show')){
    formTwo.classList.remove('show');
}else{
    formTwo.classList.add('show')
}
});

sub_destn.addEventListener('click',(e)=>{

    e.preventDefault();

    let userUpdateId ;
    let toUpdateLotn;
    let toUpdateId;
    if(formOne.user_id.value==""){
        window.alert("USER's ID FIELD IS EMPTY!");
    }else{
        userUpdateId  = formOne.user_id.value;
    };
    if(formOne.location.value==""){
        window.alert("ORDER's LOCATION FIELD, TO BE UPDATED IS EMPTY!")
    }else{
        toUpdateLotn = formOne.location.value;
    };
    if(formOne.id.value==""){
        window.alert("ORDER's ID FIELD IS EMPTY")
    }else{
        toUpdateId = formOne.id.value;
    };

    const data = {
            userUpdateId,
            toUpdateLotn,
            toUpdateId
    };


    fetch('/update_location',{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
    }).then((response)=>{
        console.log(response);
    });
    console.log(data)

   const all_change = document.querySelectorAll('p.curent-location');
   [...all_change].forEach((change)=>{
        if(change.classList.contains(userUpdateId) && change.classList.contains(toUpdateId) ){
            change.textContent = toUpdateLotn;
            formOne.user_id.value="";
            formOne.location.value="";
            formOne.id.value="";
        }
   });

   

});

sub_status.addEventListener('click',(e)=>{
    e.preventDefault();

    let userUpdateId ;
    let toUpdateStatus;
    let toUpdateId;
    if(formTwo.user_id.value==""){
        window.alert("USER's ID FIELD IS EMPTY!")
    }else{
        userUpdateId  = formTwo.user_id.value;
    };
    if(formTwo.id.value==""){
        window.alert("ORDER's ID FIELD IS EMPTY")
    }else{
        toUpdateId = formTwo.id.value;
    };
    toUpdateStatus= formTwo.status.value;

    const data = {
            userUpdateId,
            toUpdateStatus,
            toUpdateId
    };


    fetch('/update_status',{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
    }).then((response)=>{
        console.log(response);
    });
    console.log(data)

    const alls_change = document.querySelectorAll('p.delivery-status');
    [...alls_change].forEach((change)=>{
         if(change.classList.contains(userUpdateId) && change.classList.contains(toUpdateId) ){
            change.textContent = toUpdateStatus;
            formTwo.user_id.value="";
            formTwo.id.value="";  
         }
    });
  

});



logout.addEventListener('click',(e)=>{
    e.preventDefault();
    const chk= window.confirm('ARE YOU SURE ? .YOU WANT TO LOG OUT');
    if(chk == false){
        return
    }else if (chk == true){


        fetch('/logout').then((res)=>{
        return res.json();
    }).then((message)=>{
        console.log(message.message);
        window.location.replace('./index.html')

    })

    }

    

})





