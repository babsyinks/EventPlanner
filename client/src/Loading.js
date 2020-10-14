import React from 'react'
import './Loading.css'
const Loading = ()=>{
    return(
        <div className = 'loading'>
            <img src = {require('./images/loading.gif')} alt = "loading" />
        </div>
    )
}

export default Loading