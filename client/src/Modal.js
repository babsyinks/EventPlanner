import ReactDom from 'react-dom'
import './Modal.css'
export default (props)=>{
    return(
        ReactDom.createPortal(props.children,document.getElementById('modal'))
    )
}