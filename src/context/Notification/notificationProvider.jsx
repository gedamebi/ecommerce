import { notificationContext } from './notificationContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const Notification = () => {
    return(
        <ToastContainer
            position="bottom-left "
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    )
}
    
export default function NotificationProvider ({ children }) {
    const setNotification = (icon = "success", text="" , position = "bottom-right" , time = 3000) => {
        switch (icon) {
            case "success":
                toast.success(`${text}`, {
                position: `${position}`,
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            break;
            case "error":
                toast.error(`${text}`, {
                position: `${position}`,
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                })
            break;
            case "info":
                toast.info(`${text}`, {
                    position: `${position}`,
                    autoClose: time,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    })
                break;
            default:
            break;
        }
    }
    const queryNotification = (title,text,icon) => {
    
        const notificacion = Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        return notificacion
    }
    return (
        <notificationContext.Provider value={{ setNotification, queryNotification }}>
            <Notification />
            { children }
        </notificationContext.Provider>
    )
}