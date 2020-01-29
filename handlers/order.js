


        window.addEventListener('load',()=>{

const formOne = document.querySelector('form.create-order');
const formTwo = document.querySelector('form.edit-destination');
const btnOne = document.getElementById('btn-1');
const btnTwo = document.getElementById('btn-2');
const idCount = document.querySelectorAll('.table-data p.id a.id-ach');
const logout = document.getElementById('logout');
const token = sessionStorage.getItem('token');


if(token){


btnOne.addEventListener('click',(e)=>{
    console.log('here')
if(formOne.classList.contains('show')){
    formOne.classList.remove('show')

}else{
    formOne.classList.add('show')
}

});


btnTwo.addEventListener('click',(e)=>{
    if(formTwo.classList.contains('show')){
        formTwo.classList.remove('show')
    
    }else{
        formTwo.classList.add('show')
    }
    
    });




    logout.addEventListener('click',(e)=>{
        e.preventDefault();
        const chk= window.confirm('ARE YOU SURE ? .YOU WANT TO LOG OUT');
        if(chk == false){
            return
        }else if (chk == true){


            fetch('https://s-i-api.herokuapp.com/api/v1/logout').then((res)=>{
                return res.json();
            }).then((message)=>{
                console.log(message.message);
            toast("YOU HAVE LOGGED OUT SUCCESSFULLY")
                window.location.replace('./home.html')
                    sessionStorage.clear();
                
                
        
            })

        }

        

    })




    formOne.addEventListener('submit',(e)=>{
        e.preventDefault();
        const idCount = document.querySelectorAll('.table-data p.id a.id-ach');
        let id 
        console.log([...idCount][idCount.length -1])
        if([...idCount][idCount.length -1] != undefined){
            let idLast = [...idCount][idCount.length -1].textContent;
            id = parseInt(idLast)+1;

        }else{
            id=1;
        };

        
        const date = Date.now();
        const dateObj= new Date(date) 
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();
        const dateString = `${year}-${month}-${day}`

        const receiverName = formOne.receiver_name.value;
        const destinationAddress = formOne.destination_address.value;
        const pickupAddress = formOne.pickup_address.value;
        const receiverPhoneNumber = formOne.receiver_phone_number.value;
        
            const data ={
                        receiverName,
                        destinationAddress,
                        pickupAddress,
                        receiverPhoneNumber,
                        date,
                    
            };
            console.log(data)
             
            fetch('https://s-i-api.herokuapp.com/api/v1/new_order',{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json",
                                Authorization: token
                            },
                            body:JSON.stringify(data)
            }).then((res)=>{
                    console.log(res)
            });
            toast("ORDER CREATED. SEE ORDERS ABOVE")
            formOne.receiver_name.value="";  
            formOne.destination_address.value="";
            formOne.pickup_address.value=""; 
            formOne.receiver_phone_number.value=""; 
            



     createOrder (id,receiverName,destinationAddress,pickupAddress,receiverPhoneNumber,dateString)

    });


    formTwo.addEventListener('submit',(e)=>{
        e.preventDefault();
        const upDestnAddress= formTwo.destination_address.value;
        const ordId= formTwo.id.value;
        fetch('https://s-i-api.herokuapp.com/api/v1/update_destination',{
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json",
                            Authorization: token
                        },
                        body:JSON.stringify({upDestnAddress, ordId})
        }).then((result)=>{
            toast(`YOU UPDATED THE ADDRESS OF ORDER  ${ordId} TO ${upDestnAddress}`)
            console.log(result)

        const idCount = document.querySelectorAll('.table-data p.id a.id-ach');
            [...idCount].forEach((idCt)=>{
                if(idCt.textContent==ordId){
                   idCt.parentNode.parentNode.children[2].textContent=upDestnAddress; 
                   formTwo.destination_address.value="";
                   formTwo.id.value="";
                }
            })
        })
    





        });

        


    function createOrder (id,name,destination,pickup,mobile,wrtDate){
        const div = document.createElement('div');
        div.setAttribute('class','table-data');

        const idParagraph = document.createElement('p');
        idParagraph.setAttribute('class','id');
        idParagraph.setAttribute('title','CLICK TO VIEW ORDER LOCATION IN MAP');
            const idAnchor = document.createElement('a');
            idAnchor.setAttribute('class','id-ach');
            idAnchor.setAttribute('href','./map.html');
                idAnchor.addEventListener('click',(e)=>{
                        e.preventDefault();

                    window.location.assign('./map.html?id='+ id)
                });



            idAnchor.textContent=id;
            idParagraph.appendChild(idAnchor);
        
        div.appendChild(idParagraph);

        const recieverNameParagraph = document.createElement('p');
        recieverNameParagraph.setAttribute('class','receiver-name')
        recieverNameParagraph.textContent=name;
        div.appendChild(recieverNameParagraph);

        const destinationParagraph = document.createElement('p');
        destinationParagraph.setAttribute('class','destination-address')
        destinationParagraph.textContent=destination;
        div.appendChild(destinationParagraph);

        const pickupParagraph = document.createElement('p');
        pickupParagraph.setAttribute('class','pick-up-address')
        pickupParagraph.textContent=pickup;
        div.appendChild(pickupParagraph);

        const receiverPhoneNumberParagraph = document.createElement('p');
        receiverPhoneNumberParagraph.setAttribute('class','receiver-phone-number')
        receiverPhoneNumberParagraph.textContent=mobile;
        div.appendChild(receiverPhoneNumberParagraph);

        const dateParagraph = document.createElement('p');
        dateParagraph.setAttribute('class','date')
        dateParagraph.textContent=wrtDate;
        div.appendChild(dateParagraph);

        const locationParagraph = document.createElement('p');
        locationParagraph.setAttribute('class','current-location')
        locationParagraph.textContent='Storage';
        div.appendChild(locationParagraph);

        const statusParagraph = document.createElement('p');
        statusParagraph.setAttribute('class','delivery-status')
        statusParagraph.textContent='intransit';
        div.appendChild(statusParagraph);

        const deleteParagraph = document.createElement('p');
        deleteParagraph.setAttribute('class','delete')
        deleteParagraph.setAttribute('title','CLICK TO DELETE ORDER')
        deleteParagraph.classList.add(id.toString())
        
        deleteParagraph.textContent="x";
        div.appendChild(deleteParagraph);
        deleteParagraph.addEventListener('click',(e)=>{

        const result  = window.confirm(`ARE YOU SURE ?, YOU WANT TO DELETE ORDER ${id}`)
            if(result == true){
    const del =  e.target.classList.value.replace(/delete /g, '');



        fetch('https://s-i-api.herokuapp.com/api/v1/delete_order/'+del,{
                        method:"DELETE",
                        headers:{
                        Authorization: token
                        }
                            }).then((response)=>{
                    toast(`YOU DELETED ORDER ${del}` );
            console.log(response)
        });
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    
            }else{

                return
            }
    
        })



        const orderList = document.querySelector('div.rap');
        orderList.appendChild(div);

        
        
    }


fetch('https://s-i-api.herokuapp.com/api/v1/order',{

                    headers:{
                        Authorization: token
                    }

                }).then((res)=>{
                    return res.json();
                }).then((result)=>{
                if(result.length == 0){

                    const orderList = document.querySelector('div.rap');
                        orderList.textContent= "YOU HAVE NO ORDER YET"
                    

                }else{

                
                result.forEach((order)=>{
                    const {order_id,receiver_name,destination_address,pickup_address,receiver_phone_no,order_date}= order;
                   const ordD =order_date.split('T')[0]
createOrder (order_id,receiver_name,destination_address,pickup_address,receiver_phone_no,ordD);


                    
                } );
            }

     })

    }else{
        window.location.assign('./user_signin.html');
        window.alert('YOU ARE NOT SIGNED IN')
    }
                
        });




const toast =(message)=>{
    const options={
                style:{
                    main:{
                        background: "green",
                        color: "white"
                    }
                },
                settings:{
                    duration: 4000
                }
    }

return iqwerty.toast.Toast(message, options)


};

