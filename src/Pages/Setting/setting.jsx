import React, { Component } from 'react'
import { Input,Divider,Collapse,Form,Switch,Button,Modal,message,Row,Col } from 'antd'
import './setting.css'
import {request} from '../../request'
const {Panel}=Collapse
export default class setting extends Component {
    state={
        sendKey:'',
        email:'1058@qq.com',
        id:localStorage.getItem('id'),
        mailConfig:{
            mailAddress:''
        },
        count:60,
        verSent:false,
        exitHelper:false
    }
    componentDidMount(){
        if(localStorage.getItem('token')){
            this.getUserInfo()
        }
    }
    componentWillUnmount(){
        this.setState=()=>false
    }
    static getDerivedStateFromProps(props){
        if(!localStorage.getItem('token')){
            props.history.push('/out/login')
        }
        return null
    }

    render() {
        const {cpConfig,mailConfig,sendKey,wxCpStatus,mailStatus,wxMpStatus}=this.state
        return (
            <div className='setting'>
                <h1>SendKey</h1>
                <Input.Password className='input-password'   value={sendKey}/>
                <Button type='primary' danger className='reset-btn' onClick={this.resetSendKey}>重置</Button>
                <Divider/>
                <Collapse>
                    <Panel header='官方公众号'>
                            <Form layout='vertical'>
                                <Form.Item name='wxMpstatus' label='是否开启'>
                                    <Switch onChange={this.throttle(this.setMpStatus,1000)} checked={wxMpStatus}></Switch>
                                </Form.Item>
                            </Form>
                    </Panel>
                    <Panel header='企业号' className='corp'>
                        <Form layout='vertical' ref={c=>this.corpRef=c}>
                            <Form.Item name='wxCpStatus' label='是否开启' >
                                <Switch checked={wxCpStatus} onChange={this.setWxCpStatus}/>
                            </Form.Item>
                            <Form.Item name='corpId' label='企业ID' initialValue={cpConfig?cpConfig.corpId:''}
                                rules={[{required:true,message:'请填写企业ID'}]}
                            >
                                <Input disabled={wxCpStatus?false:true}  ></Input>
                            </Form.Item>
                            <Form.Item name='agentId' label='应用ID' rules={[
                                {required:true,message:'请填写应用ID'},
                                {pattern:'^[0-9]*$',message:'应用ID只允许使用数字'}
                                ]} initialValue={cpConfig?cpConfig.agentId:''}>
                                
                                <Input disabled={wxCpStatus?false:true} ></Input>
                            </Form.Item>
                            <Form.Item name='secret' label='应用secret' rules={[{required:true,message:'请填写应用secret'}]} initialValue={cpConfig?cpConfig.secret:''}>
                                
                                <Input disabled={wxCpStatus?false:true} ></Input>
                            </Form.Item>
                            <Form.Item name='target' label='推送目标'  rules={[{required:true,message:'请填写用户ID'}]} initialValue={cpConfig?cpConfig.target:''}>
                                <Input defaultValue='@all' disabled={wxCpStatus?false:true} ></Input>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 22, span: 1 }}>
                                <Button type='primary' onClick={this.storeCorp} >保存</Button>
                            </Form.Item>
                        </Form>

                    </Panel>
                    <Panel header='邮箱'>
                        <Form layout='vertical'>
                            <Form.Item name='mailStatus' label='是否开启' >
                                <Switch onChange={this.throttle(this.setMailStatus,1000)} checked={mailStatus}></Switch>
                            </Form.Item>
                            <div className='mailAddress_text'>邮箱地址</div>
                            <div className='mailAddress_show'>{mailConfig.mailAddress}</div>
                            <Form.Item wrapperCol={{ offset: 22, span: 1 }}>
                                <Button type='primary' onClick={mailConfig.mailAddress?this.unbindMail:this.showModal} >{mailConfig.mailAddress?'解绑':'绑定'}</Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                   
                </Collapse>
                <Modal title='绑定邮箱' visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form ref={c=>this.emailRef=c}>
                        <Form.Item name='mailAddress' 
                            rules={
                                    [
                                        {required:true,message:'邮箱不能为空'},
                                        {pattern:'^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',message:'请按照邮箱格式输入'}
                                    ]
                                }>
                            <Row>
                                <Col span={18}><Input placeholder="请输入邮箱" /></Col>
                                <Col span={6}>
                                    <Button type='primary' disabled={this.state.verSent?true:false} onClick={this.getverCode}>
                                        {this.state.verSent?`${this.state.count}s后重新发送`:'获取验证码'}
                                    </Button></Col>
                            </Row>
                        </Form.Item>
                        <Form.Item name='verCode' 
                            rules={
                                [
                                    {required:true,message:'验证码不能为空'},
                                ]
                            }
                        >
                            <Input 
                                className='VerCode'
                                placeholder='请输入验证码'
                            />
                        </Form.Item>
                    </Form>
                
                
                </Modal>
            </div>
        )
    }
    // 节流函数
    throttle=(func,delay)=>{
        var prev=Date.now()
        return function(){
            var context=this;
            var args=arguments;
            var now = Date.now()
            if(now-prev>=delay){
                func.apply(context,args)
                prev=Date.now()
            }
        }
    }

    // 获取用户信息
    getUserInfo=async()=>{
        const id=this.state.id
        
        const {data}=await request.get(`/user/config/${id}`)
        if(data.code!==20000){
            const {exitHelper}=this.state
            this.setState({
                exitHelper:!exitHelper
            })
            if(data.code===41100) return
            return message.error('获取用户信息失败')
        }
        const temp_mailConfig={mailAddress:''}
        const temp_cpConfig={
            corpId:'',
            agentId:'',
            secret:'',
            target:''
        }
        this.setState({
            cpConfig:data.data.cpConfig?data.data.cpConfig:temp_cpConfig,
            mailConfig:data.data.mailConfig?data.data.mailConfig:temp_mailConfig,
            sendKey:data.data.sendKey,
            mailStatus:data.data.mailStatus,
            wxCpStatus:data.data.wxCpStatus,
            wxMpStatus:data.data.wxMpStatus
        })
        
        
    }

    
    //重置SendKey
    resetSendKey=async()=>{
        const id=this.state.id
        const {data}=await request.put(`/user/sendKey/${id}`)
        this.setState({
            sendKey:data.data
        })
    }

    // 企业号
    setWxCpStatus=(e)=>{
        this.setState({
            wxCpStatus:e
        })
    }
    storeCorp=()=>{
        const id=this.state.id
        if(!this.corpRef.getFieldValue('isChecked')){

        }
        this.corpRef.validateFields()
        .then(async(val)=>{
            console.log(val);
            const {corpId,agentId,secret,target}=val
            const {wxCpStatus}=this.state
            var cpconfig=JSON.stringify({
                corpId,
                wxCpStatus,
                agentId,
                secret,
                target
            })
            const {data}=await request.put(`/user/cpConfig/${id}`,cpconfig,{
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                }
            })
            if(data.code!==20000){
                const {exitHelper}=this.state
                this.setState({
                    exitHelper:!exitHelper
                })
            if(data.code===41100) return
                return message.error('保存失败')
            }
            message.success('保存成功')
        }).catch(error=>{
            console.log(error);
        })
    }

    // 邮箱
    setMailStatus=async(checked)=>{
        if(!this.state.mailConfig.mailAddress){
            return message.error('请先绑定邮箱')
        }
        const id = this.state.id
        const {data}=await request.post(`/user/mailStatus/${id}`)
        if(data.code!==20000){
            const {exitHelper}=this.state
            this.setState({
                exitHelper:!exitHelper
            })
            if(data.code===41100) return
            return message.error('系统繁忙,请稍后重试!')
        }
        this.setState({
            mailStatus:checked
        })
        message.success('设置成功!')
    }
    unbindMail=async()=>{
        const id=this.state.id
        if(this.state.mailStatus){
            this.setMailStatus(false)
        }
        const {data}=await request.delete(`/user/mail/${id}`)
        if(data.code!==20000){
            const {exitHelper}=this.state
            this.setState({
                exitHelper:!exitHelper
            })
            return message.error('解绑失败!')
        }
        message.success('解绑成功!')
        this.setState({
            mailConfig:{mailAddress:''}
        })
    }
    changeMailAddress=(e)=>{
        this.setState({
            mailConfig:{mailAddress:e.target.value}
        })
    }
    // 模态框
    showModal=()=>{
        this.setState({
            isModalVisible:true
        })
    }
    getverCode=()=>{
        const {id}=this.state
        this.emailRef.validateFields(['mailAddress']).then(async(val)=>{
            const mailAddressJSON=JSON.stringify({
                mailAddress:val.mailAddress
            })
            const {data}=await request.post(`/user/mail/${id}`,mailAddressJSON,{
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                }
            })
            console.log(data);
            if(data.code!==20000){
                const {exitHelper}=this.state
                this.setState({
                    exitHelper:!exitHelper
                })
                if(data.code===41100) return

                return message.error('发送失败!')
            }
            this.setState({
                verSent:true
            })
            let {count}=this.state
            // 打开定时器
            const TimeId=setInterval(()=>{
                if(count>1){
                    count-=1
                    return this.setState({count:count})
                }
                clearInterval(TimeId)
                this.setState({
                    verSent:false,
                    count:60
                })
            },1000)
        }).catch(error=>{
            console.log(error);
        })
        
       
    }
    handleOk=()=>{
        const {id}=this.state
        this.emailRef.validateFields()
        .then(async(val)=>{
            const verJSON=JSON.stringify({
                mailAddress:val.mailAddress,
                code:val.verCode
            })
            const {data}=await request.put(`/user/mail/${id}`,verJSON,{
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                }
            })
            if(data.code!==20000){
                const {exitHelper}=this.state
                this.setState({
                    exitHelper:!exitHelper
                })
                if(data.code===41100) return

               return message.error('绑定失败!')
            }
            message.success('绑定成功!')
            this.setState({
                isModalVisible:false,
                mailConfig:data.data
            })

        })
        .catch(error=>{
            console.log(error);
        })
    }
    handleCancel=()=>{
        this.setState({
            isModalVisible:false
        })
    }
    // 官方公众号
    setMpStatus=async(checked)=>{
        const id = this.state.id
        const {data}=await request.post(`/user/mpStatus/${id}`)
        console.log(data);
        if(data.code!==20000){
            const {exitHelper}=this.state
            this.setState({
                exitHelper:!exitHelper
            })
            if(data.code===41100) return
            return message.error('系统繁忙,请稍后重试!')
        }
        this.setState({
            wxMpStatus:checked
        })
        message.success('设置成功!')
    }
}
