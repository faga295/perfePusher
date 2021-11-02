import React, { Component } from 'react'
import SimpleMDe from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import './exper.css'
import { Button,Input,Anchor } from 'antd'

const {Link}=Anchor
export default class index extends Component {
    state={value:''}
    static getDerivedStateFromProps(props){
        if(!localStorage.getItem('token')){
            props.history.push('/out/login')
        }
        return {}
    }
    render() {
        return (
            <div>
                 <Anchor style={{position:'absolute',top:'200px',left:'20px'}}>
                    <Link href="" title="markdown" />
                   
                </Anchor>,
                <div id='MDE'>
                    <div className='title'>
                        <Input className='title_input' ref={c=>this.title_input=c} placeholder='输入消息的标题'></Input>
                    </div>
                    <div className='MDE'>
                        <SimpleMDe value={this.state.value} onChange={this.setValue} placeholder='mde'></SimpleMDe>
                        <Button type='primary' className='bttn' size='large'>submit</Button>

                    </div>
                </div>
            </div>
        )
    }
    setValue=(value)=>{

        console.log(typeof value);
        this.setState({
            value
        })
    }
    
}
