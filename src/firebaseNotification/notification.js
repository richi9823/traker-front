import React, {useState, useEffect} from 'react'
import {requestForToken, onMessageListener} from './firebase';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Notification = () => {
    const [notification, setNotification] = useState({title: '', body: ''});
    const notify = () => toast(<ToastDisplay/>);

    function ToastDisplay() {
        return (
            <div>
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
                <ToastContainer/>
            </div>
            
        );
    };

    useEffect(() => {
        if (notification?.title) {
            notify()
        }
    }, [notification])

    requestForToken();

    onMessageListener()
        .then((payload) => {
            setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
        })
        .catch((err) => console.log('failed: ', err));


}

export default Notification;