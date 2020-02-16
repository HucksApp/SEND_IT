import React,{ Component } from 'react';

class OrderSumary extends Component {

    state={
        data:{
        deliveredCount: 0,
        intransitCount: 0
        }
    }



componentDidMount(){
    

    const token = sessionStorage.getItem('token');  
    fetch('https://s-i-api.herokuapp.com/api/v1/order',{

        headers:{
            Authorization: token
        }

    }).then(res=>{return res.json()})
        .then(list=>{

            list.forEach(order=>{
                if(order.status === 'Delivered' ){
                    const copyData = {...this.state.data}
                        const newCount = copyData.deliveredCount + 1;
                        copyData.deliveredCount = newCount;
                    this.setState({data: copyData})

                }else if( order.status === 'Intransit'|| order.status === 'In transit' ){
                    const dataCopy = {...this.state.data};
                    const newCont = dataCopy.intransitCount + 1;
                    dataCopy.intransitCount = newCont;
                    this.setState({data: dataCopy})
                }
            })

        }).catch(err=>console.log(err));
}

render(){
    return (
        <div className="order_sumary">
            <div className="ord_sum_deliv">
                <p className="ord_sum_deliv_title">ORDERS DELIVERED</p>
                <p className="ord_sum_deliv_value">{ this.state.data.deliveredCount }</p>
            </div>
            <div className="ord_sum_intran">
                <p className="ord_sum_intran_title">ORDERS IN PROCESS</p>
                <p className="ord_sum_intran_value">{ this.state.data.intransitCount }</p>
            </div>
            
        </div>
    );
}
}

export default OrderSumary;
