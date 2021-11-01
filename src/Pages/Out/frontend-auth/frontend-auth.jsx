import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'
export default class FrontendAuth extends Component {
    // state={
    //     id:0,
    // }
    componentWillUnmount(){
        console.log('frontend unmount');
    }
    render() {
        console.log('frontend-auth');
        const routes=this.props.routeConfig
        const {pathname}=this.props.location
        const token=localStorage.getItem('token')
        const targetRoute=routes.find((item)=>{
            return item.path===pathname
        })
        if(!targetRoute){
            return <Redirect to={`/out/${sessionStorage.getItem('path')?sessionStorage.getItem('path'):'index'}`}></Redirect>
        }
        if(targetRoute.path!=='/out/login'){
            sessionStorage.setItem('path',targetRoute.path.split('/')[2])
        }
        if(token){
            console.log('aaa');
            return <Route path={targetRoute.path} component={targetRoute.component}></Route>
        }
        if(targetRoute.auth){
            return <Redirect to='/out/login'></Redirect>
        }
        return <Route path={targetRoute.path} component={targetRoute.component}></Route>
    }
}
