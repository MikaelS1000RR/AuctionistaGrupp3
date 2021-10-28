import React from 'react'
import '../css/Uploadview.css';

export default function FileUpload() {

    function onFileLoad(e) {
        console.log(e.ta);
    }

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" onChange={onFileLoad} />
            </label>
        </div>
    )
}
