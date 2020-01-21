const edits = document.getElementsByClassName('edit-btn');
const inputs= document.getElementsByTagName('input');
const  containers = document.querySelectorAll('span.value');
const changes = document.getElementsByClassName('change');
const logout = document.getElementById('logout');




[...edits].forEach((edit)=>{
edit.addEventListener('click',(e)=>{
if(e.target.classList.contains('user-name')){
    togBar('user-name', inputs)

} else if (e.target.classList.contains('house-address')){

    togBar('house-address', inputs)

} else if (e.target.classList.contains('phone-number')){

    togBar('phone-number', inputs)

}else if(e.target.classList.contains('password')) {

    togBar('password', inputs)

}else{ return }
})
});



Array.from(changes).forEach((change)=>{
change.addEventListener('click',(e)=>{
    Array.from(inputs).forEach((input)=>{
        if(e.target.classList.contains(input.id) && input.value !=""){

            let data = {newVal:input.value, keyToValue:input.id};
            console.log(data);
            fetch('/update_profile',{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json, text/plain, */*"
                    },
                    body: JSON.stringify(data)
            }).then((response)=>{
                console.log(response);
                input.value="";
             input.classList.remove('show');  
             window.alert(` You Just Updated \n Your ${input.id}`)    
            })

        }else if(change.classList.contains(input.id) && input.value ==""){
            window.alert('NOT A VALID CHANGE \n INPUT FIELD IS EMPTY')
        }
    })
    })
});



[...inputs].forEach((input)=>{
input.addEventListener('input',(e)=>{
    const val = e.target.value;
   [... containers].forEach((cont)=>{
       const upd = cont.classList.value.split(' ')[1].toString();
    if(e.target.id == upd){
        cont.textContent = val;
    }
   })
})
})




function togBar( identifier, inputs){
    let identify= identifier;
    [...inputs].forEach((input)=>{
     if(input.id==identify && !input.classList.contains('show')){
         input.classList.add('show');
     }else if (input.id==identify && input.classList.contains('show')){
        input.classList.remove('show');
     }
    })

}




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

