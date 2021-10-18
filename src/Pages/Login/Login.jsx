import React, { Component } from 'react'
import {Button} from 'antd'
import 'antd/dist/antd.css'
import ewm from '../../img/ewm.jpeg'
export default class Login extends Component {
    render() {
        return (
            <div>
                <img src={ewm} alt="" />
                <Button type='primary' onClick>扫码后点击继续</Button>
            </div>
        )
    }
}
