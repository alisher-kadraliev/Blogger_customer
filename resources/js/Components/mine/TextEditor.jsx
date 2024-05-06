import {useState} from "react";

export default function TextEditor() {

    const [content,setContent] = useState(false);

    const handleChangeContent = (e) => {
        setContent(e.target.innerHTML)
    }

    const toggleBold = () => {
        document.execCommand('bold',true,null);
    }

    return (
        <div>
            <button
                onClick={toggleBold}
            >
                Bold
            </button>
       <div
           contentEditable="true"
           onInput={handleChangeContent}
           dangerouslySetInnerHTML={{__html: content}}
               style={{border:"1px solid black",minHeight:"100px",padding: "5px"}}
       >

       </div>
        </div>
    );
}
