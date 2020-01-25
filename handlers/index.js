const menu= document.getElementById('tog-menu');
const btns= document.getElementsByClassName('central-btn')












menu.addEventListener('click',(e) =>{
[...btns].forEach((btn)=>{

    if (btn.classList.contains('open')){
        btn.classList.remove('open');
    }else{
        btn.classList.add('open');
    }
})

})