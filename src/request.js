import axios from 'axios'
import {message} from 'antd'
const CancelToken=axios.CancelToken
let cancel;
const request=axios.create({
    baseURL:'http://49.234.111.177:14000',
    timeout:3000
})
request.interceptors.request.use(config=>{
    if(!localStorage.getItem('token')&&config.url!=='/mp/login/qrcode'){
        cancel('请求已取消')
        config.cancelToken=new CancelToken((c)=>{
            cancel=c
        })
    }
   
    config.headers.token=localStorage.getItem('token')
    return config
})

request.interceptors.response.use(res=>{
    console.log(res);
   if(res.data.code===41100){
        message.error('请重新登陆')
        localStorage.removeItem('token')
   }
   return res
},error=>{
    
})
export default request