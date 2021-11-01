import React, { Component } from 'react'
import {Comment,Tooltip,Avatar} from 'antd'
import moment from 'moment'
import './index.css'
export default class index extends Component {
    state={
        pageNum:0,
        commentList:[
            {
                id:15,
                headImgUrl:'https://joeschmoe.io/api/v1/random',
                nickname:'Han Solo',
                datetime:'2017-10-01',// 2017-10-01
                content:'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            }
        ]
    }
    componentDidMount(){
        console.log(sessionStorage.getItem('path'));
        window.addEventListener('scroll',async()=>{
            const height=document.documentElement.scrollHeight-document.documentElement.scrollTop-document.documentElement.clientHeight
            if(height<300){
                // const {data}=await request('/xxx')
                console.log(moment);
            }
        })
    }
    render() {
        const {commentList}=this.state
        
        return (
            <div>
                {
                    commentList.map((item,index)=>{
                        
                        return (
                            <div className='comment' key={item.id}>
                                <Comment
                                    author={item.nickname}
                                    avatar={<Avatar src={item.headImgUrl} alt={item.nickname} />}
                                    content={
                                        <p>
                                          {item.content}
                                        </p>
                                    }
                                    datetime={
                                        <Tooltip title={moment(item.datetime).format('YYYY-MM-DD')}>
                                            <span>{moment(item.datetime).fromNow()}</span>
                                        </Tooltip>
                                    }
                                >

                                </Comment>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
