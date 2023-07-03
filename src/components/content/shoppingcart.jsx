import React, { Component } from 'react';
import Dialog from "./dialog";

class shoppingcart extends Component{
    constructor(){
        super()
        this.state = {
            orders:[
                    {
                        scenicid:1,
                        order_amount:85.00,
                        amount:1,
                        reserve_date:'2023-7-3',
                    },
                    {

                        scenicid:2,
                        order_amount:100.00,
                        amount:1,
                        reserve_date:'2023-7-5',
                    },
            ]
        }   
    }
    
    //第三种计算总价的方法
    totalPrice(){
        const totalPrice = this.state.orders.reduce((preValue,item)=>{
            return item.amount*item.order_amount + preValue
            },0)
        return totalPrice
    }

    //增加商品数量
    increase(index){
        //不能直接对state里的count直接做改变：this.state.orders[index].count+=1
        //直接修改state里面的值会影响到子组件和父组件之间的值变化不一致
        //正确做法是做浅拷贝
        const neworders = [...this.state.orders]
        neworders[index].amount +=1
        //修改orders的引用
        this.setState({ orders:neworders })
    }
    //减少商品数量
    deincrease(index){
        const neworders = [...this.state.orders]
        neworders[index].amount +=-1
        this.setState({ orders:neworders })
    }
    //删除商品
    removeItem(index){
        const neworders = [...this.state.orders]
        neworders.splice(index,1)
        this.setState({orders:neworders})
    }
    //当有商品时显示商品
    renderordersList(){
        const {orders} = this.state
        return <div>
                <table border='1' width="800px" align="center">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>景区ID</th>
                            <th>订单金额</th>
                            <th>购买数量</th>
                            <th>预约时间</th>
                        </tr>    
                    </thead>
                    <tbody align="center">
                        {orders.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.scenicid}</td>
                                    <td>{"￥" + item.order_amount}</td>
                                    <td>
                                        <button disabled={item.amount >1?false:true}
                                            onClick={()=>this.deincrease(index)}>-</button>
                                            {item.amount}
                                        <button
                                            onClick={()=>this.increase(index)}>+</button>
                                    </td>
                                    <td>{item.reserve_date}</td>   
                                    <td><button onClick={()=>this.removeItem(index)}>删除</button></td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td>总价格：￥{this.totalPrice()}</td>  
                        </tr>    
                    </tbody>    
                </table>    
                <button onClick={this.buy} style={{width: "100%"}} type="submit" className="btn btn-primary">结算</button>
                <button onClick={() => {this.setState(this.state.show == !this.state.show)}} style={{width: "100%"}} type="submit" className="btn btn-primary">结算</button>
            </div>
    }
    //当没有商品时显示购物车为空
    renderordersEmpty(){
        return <div><h1>购物车为空，快去选购吧！</h1></div>
    }
    render(){
        const {orders} = this.state
        return orders.length ? this.renderordersList():this.renderordersEmpty()
        }
}

export default shoppingcart;
