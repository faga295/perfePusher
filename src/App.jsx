import React, { Component } from 'react'
import Out from './Pages/Out/out.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import Markdown from './Pages/Markdown/markdown.jsx'
import Subscribe from './Pages/Subscribe/Subscribe.jsx'
import  './App.css'
import { Route,Redirect,Switch} from 'react-router-dom'

class App extends Component {
  componentDidMount(){
  }
  
  render() {
    
    return (
      <div>
        <Switch>
          <ErrorBoundary>
            <Route path='/out' component={Out}></Route>
            <Route path='/markdown' component={Markdown}></Route>
            <Route path ='/subscribe' component={Subscribe}></Route>
            <Redirect to='/out'></Redirect>
          </ErrorBoundary>
        </Switch>
      </div>
    )
  }
  navTo=(e)=>{
    this.props.history.push(`/${e.key}`)
  }
}
export default App
