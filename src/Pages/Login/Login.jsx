import React, { Component } from 'react'
import {message, notification} from 'antd'
import 'antd/dist/antd.css'
import './Login.css'
import request from '../../request'
import Context from '../Out/context'
export default class Login extends Component {
    state={
        exit:'',
        id:''
    }

    static contextType = Context;
   
    componentDidMount(){
        //console.log(this.context.handleLeave)
        this.getDate()
    }
    getDate=async()=>{
        let res=await request.get('/mp/login/qrcode')
        if(!res){
            return message.error('获取二维码失败!')
        }
        let qrcode=res.data.data.qrcodeUrl
        let ticket=res.data.data.ticket
        const id=setInterval(async()=>{
            res = await request.get('/mp/login/qrcode')
            qrcode=res.data.data.qrcodeUrl
            ticket=res.data.data.ticket
            this.setState({
                qrcode
            })
        },180000)
        this.ws=new WebSocket(`ws://49.234.111.177:14000/mp/login/socket/${ticket}`)
        this.ws.onclose=()=>{
            console.log('连接关闭')
        }
        this.ws.onmessage=(e)=>{
            console.log(e.data);
            console.log(e);
            let data=JSON.parse(e.data)
            console.log(data.code);
            const {id,headImgUrl,nickname,token}=data.data
            localStorage.setItem('token',token)
            localStorage.setItem('id',id)
            localStorage.setItem('headImgUrl',headImgUrl)
            localStorage.setItem('nickname',nickname)
            this.ws.close()
            notification['success']({
                message:'登录成功',
                top:80
            })
            this.state.exit()
            this.props.history.push(`/out/${sessionStorage.getItem('path')}`)

        }
        this.setState({
            qrcode,
            id
        })
    }
    componentWillUnmount(){
        clearInterval(this.setState.id)
    }
    render() {
        return (
            <div>
            <Context.Consumer>{
                 ({
                    handleLeave
                 })=>{
                    if(this.state.exit===''){
                        this.setState({exit:handleLeave})
                    }
                     return(
                         <div className='qr_container'>
                            <div className='context'>
                                请用微信扫码登陆
                            </div>
                            <img src={this.state.qrcode} alt="" className='qrcode'/>
                        </div>
                     )
                 }
                 }

            </Context.Consumer>
            </div>
        )
    }
    
}
