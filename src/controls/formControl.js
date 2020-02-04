const submitControl=(val, obj)=>{

    const newData = {...obj.state.data};
    newData.chck = val;
    obj.setState({
           data: newData 
    });
    
    }

    export default submitControl;