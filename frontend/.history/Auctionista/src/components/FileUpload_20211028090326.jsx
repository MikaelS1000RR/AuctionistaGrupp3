import React from 'react'
import '../css/Uploadview.css';

export default function FileUpload() {

    function onFileLoad(e) {
        let files = e.target.files
        console.log(files)
    }

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" multiple onCh onChange={onFileLoad} />
            </label>
        </div>
    )
}
