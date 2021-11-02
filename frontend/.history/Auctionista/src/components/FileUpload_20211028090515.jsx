import React from 'react'
import '../css/Uploadview.css';

export default function FileUpload() {

    function onFileLoad(e) {
        let files = e.target.files
        console.log(files)

        let formData = new FormData()

        formData.append()
    }

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" multiple onChange={onFileLoad} />
            </label>
        </div>
    )
}
