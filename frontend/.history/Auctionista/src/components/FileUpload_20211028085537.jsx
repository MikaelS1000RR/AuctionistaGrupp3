import React from 'react'
import '../css/Uploadview.css';

export default function FileUpload() {

    function onFileLoad(e) {

    }

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" onChange/>
            </label>
        </div>
    )
}
