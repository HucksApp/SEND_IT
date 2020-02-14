import toastr from 'toastr';
import 'toastr/build/toastr.min.css';



toastr.options = {
    positionClass : 'toast-top-right',
    hideDuration: 300,
    timeOut: 10000
  };
  toastr.clear();


  export default toastr;