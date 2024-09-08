import Toast from "react-native-toast-message"
import { MessageConfig } from "./MessageHook";
import { useDispatch } from "react-redux";
import { hide, show } from "../../stores/reducer-slice";

const MessageNotice: React.FC = () => {

    const dispatch = useDispatch()

    const handleShow = () => {
        dispatch(show())
    }

    const handleHide = () => {
        dispatch(hide())
    }

    return (
        <Toast onShow={() => handleShow()} onHide={() => handleHide() } config={MessageConfig}/>
    )
}

export default MessageNotice