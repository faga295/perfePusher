import React, { Component } from 'react'
import {Menu} from 'antd'
import 'antd/dist/antd.css'
import {BrowserRouter,Link,Route} from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
export default class App extends Component {
  render() {
    return (
      <div>
        <Menu  mode="horizontal">
          <Menu.Item key="mail" >
            Navigation One
          </Menu.Item>
          <Menu.Item key="app"  >
            Navigation Two
          </Menu.Item>
          <Menu.Item key="alipay">
            <BrowserRouter>
              <Link to='/login'>
                登录
              </Link>
            </BrowserRouter>
          </Menu.Item>
        </Menu>
        <div className='content'>
          <BrowserRouter>
            <Route path='/login' component={Login}></Route>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}
