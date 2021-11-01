import React, { Component,lazy, Suspense } from 'react'
import {Menu} from 'antd'
import 'antd/dist/antd.css'
import {Route,Link,Switch,Redirect} from 'react-router-dom'
import './out.css'
import Context from './context.jsx'
// import FrontendAuth from './frontend-auth/frontend-auth'
// import routerObj from '../../router'
import signOut from '../../img/退出.png'
import defaultAvatar from '../../img/user (1).png'
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const Login=lazy(()=>import ('../Login/Login.jsx'))
const Index=lazy(()=>import('../Index/index.jsx'))
const Desc =lazy(()=>import('../Desc/desc.jsx'))
const Exper = lazy(()=>import('../Exper/exper.jsx'))
const Setting = lazy(()=>import('../Setting/setting.jsx'))
class out extends Component {
    state={
        isSignIn:localStorage.getItem('token')?true:false,
        path:sessionStorage.getItem('path')?sessionStorage.getItem('path'):'index'
    }
    
    componentDidMount(){
        this.checkToken()
    }
    checkToken=()=>{
        const token = localStorage.getItem('token')
        if(token){
            this.setState({
                isSignIn:true
            })
        }
    }
    
    static getDerivedStateFromProps(props){
        if(!localStorage.getItem('token')){
            return {isSignIn:false}
        }
        return {}
    }
    render() {
        const headImgUrl=localStorage.getItem('headImgUrl')
        const nickname=localStorage.getItem('nickname')
        return (
            <div>
                <div className='header'>
                    <Menu 
                        mode="horizontal"
                        onClick={this.navTo}
                        selectedKeys={this.state.path}
                    >
                        <Menu.Item key="index" >
                        首页
                        </Menu.Item>
                        <Menu.Item key="desc"  >
                        使用文档
                        </Menu.Item>
                        <Menu.Item key="exper">
                        功能体验
                        </Menu.Item>
                        <Menu.Item key="setting">
                        个人配置
                        </Menu.Item>
                        
                    </Menu>
                    <div className='userInfo' style={{display:this.state.isSignIn?'block':'none'}}
                    onMouseEnter={this.onHover} 
                    onMouseLeave={this.onLeave} 
                    >
                        <div className='headImgUrl' onClick={this.toUser} ref={c=>this.headImgUrl=c}>
                            <img src={headImgUrl} alt="" />
                        </div>
                        <div className='nickname'>{nickname}</div>
                        <div className='userTools' style={{display:this.state.isHover?'block':'none'}} 
                        >
                            <a href='/' className='signOut' onClick={this.signOut}>
                                <img src={signOut} alt="" />
                                <span>退出</span>
                            </a>
                        </div>
                    </div>
                    <div className='signIn' style={{display:this.state.isSignIn?'none':'block'}}>
                        <Link to='/out/login'  >登录
                        <img src={defaultAvatar} alt='aaa'></img>
                        </Link>
                        
                    </div>
                </div>
                    
                <div className='content'>
                    <Suspense fallback={<Spin className='spin' indicator={<LoadingOutlined style={{fontSize:24}}></LoadingOutlined>}></Spin>}>
                        <Context.Provider 
                        value={{handleLeave:this.handleLeave}} 
                        >
                            <Switch>
                                <Route path='/out/login' component={Login}></Route>
                                <Route path='/out/desc' component={Desc}></Route>
                                <Route path='/out/index' component={Index}></Route>
                                <Route path='/out/exper' component={Exper}></Route>
                                <Route path='/out/setting' component={Setting}></Route>
                                <Redirect to={`/out/${sessionStorage.getItem('path')?sessionStorage.getItem('path'):'index'}`}></Redirect>
                            </Switch>
                        </Context.Provider>
                    </Suspense>
                </div>
            </div>
        )
    }
    handleLeave=()=>{
        this.setState({
            isSignIn:true
        })
    }
    warning=()=>{
        console.log('warning');
        // message.warning('请登录')
    }
    navTo=(e)=>{
        if(!localStorage.getItem('token')){
            this.setState({
                isSignIn:false
            })
        }
        this.setState({
            path:e.key
        })
        sessionStorage.setItem('path',e.key)
        this.props.history.push(`/out/${e.key}`)
    }
    signOut=(e)=>{
        e.preventDefault()
        localStorage.removeItem('token')
        this.setState({
            isSignIn:false
        })
    }
    onHover=()=>{
        this.headImgUrl.style.boxShadow='2px 2px 2px 1px rgba(0, 0, 0, 0.2)'
        this.setState({isHover:true})
    }
    onLeave=()=>{
        this.headImgUrl.style.boxShadow=''
        this.setState({isHover:false})
    }
    
}
export default out
// 时间 通道 标题 url