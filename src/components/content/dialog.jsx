import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom'
 
export default function Dialog(props) {
    const [node, setNode] = useState();
 
    useEffect(() => {
        const element = document.createElement('div');
        document.body.appendChild(element);
        setNode(element);
        return () => {
            document.body.removeChild(element);
        };
    }, []);
 
    return node ? ReactDOM.createPortal(props.children, node) : null;
}