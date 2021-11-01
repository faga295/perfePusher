import Login from '../Pages/Login/Login.jsx'
import Index from '../Pages/Index/index.jsx'
import Desc from '../Pages/Desc/desc.jsx'
import Exper from'../Pages/Exper/exper.jsx'
import Setting from '../Pages/Setting/setting.jsx'
const routes=[
    {
        path:'/out/login',
        component:Login,
        auth:false
    },
    {
        path:'/out/index',
        component:Index,
        auth:false
    },
    {
        path:'/out/desc',
        component:Desc,
        auth:false
    },
    {
        path:'/out/exper',
        component:Exper,
        auth:true
    },
    {
        path:'/out/setting',
        component:Setting,
        auth:true
    }
]
export default routes