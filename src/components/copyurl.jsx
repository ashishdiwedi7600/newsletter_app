
import { CopyToClipboard } from "react-copy-to-clipboard";
import { clipBoard } from "../icons/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Copyurl(props) {
    return (
        <div style={{position:'absolute',bottom:'5px',right:'5px'}}>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
            />

            <CopyToClipboard
                text={props.image}
                onCopy={() => toast('copied')}>
                {clipBoard}
                 </CopyToClipboard>
        </div>
    );
}



