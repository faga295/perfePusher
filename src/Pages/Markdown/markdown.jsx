import React, { Component } from 'react'
import marked from 'marked'
marked.setOptions({ // marked 设置
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  })
export default class markdown extends Component {
   state={
    content:"# GFM\n\n## Autolink literals\n\nwww.example.com, http…| -: | :-: |\n\n## Tasklist\n\n* [ ] to do\n* [x] done"
   }
    componentDidMount(){
       
    }
    render() {
        const strHtml=marked(this.state.content)
        return (
            <div >
                <div dangerouslySetInnerHTML={{ __html:strHtml}}></div>
            </div>
        )
    }
}
