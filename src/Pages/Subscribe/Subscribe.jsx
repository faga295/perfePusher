import React, { Component } from 'react'
import { subscribeReq } from '../../request'
import axios from 'axios'
import changeOrigin from '../../setupProxy'
export default class Subscribe extends Component {
    state={
        
    }
    componentDidMount(){
        this.loadXMLDoc()
    }
    render() {
        return (
            <div>
                <h1>subscribe</h1>
            </div>
        )
    }
    loadXMLDoc = async (dname)=>{
        const res=await axios.get('http://localhost:3000/api')
        console.log(res)
    }
}
