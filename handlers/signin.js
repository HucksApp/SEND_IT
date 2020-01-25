const admin = document.getElementById('admin');
const adminForm= document.querySelector('form.admin');
const userForm= document.querySelector('form.user');

admin.addEventListener('click',(e)=>{

if(adminForm.classList.contains('display')){
      adminForm.classList.remove('display');
      userForm.classList.remove('remv');
      console.log('admin here')
}else {
        let chk = window.confirm('RESTRICTED...... ADMIN ONLY !!!!!!!');
        if( chk == true){
        adminForm.classList.add('display');
        userForm.classList.add('remv') ;
        console.log('admin here') 

        }else{
                return
        }
}

})
