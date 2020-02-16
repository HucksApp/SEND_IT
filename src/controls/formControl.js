// ENABLE AND DISBLE FORM SUBMIT
// SETS VARIABLE IN THE COMPONENT STATE REFERENCE BY FORM



const submitControl = (val, obj) => {

       const newData = { ...obj.state.data };
       newData.chck = val;
       obj.setState({
              data: newData
       });

}

export default submitControl;