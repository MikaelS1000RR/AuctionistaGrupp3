import React from 'react'
import '../css/Uploadview.css';

export default function FileUpload() {

    function onFileLoad(e) {
        let files = e.target.files
        console.log(files)

        // Create a holder to store files
        let formData = new FormData()

        for (let file of files) {
            for
        }

        formData.append('files')
    }

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" multiple onChange={onFileLoad} />
            </label>
        </div>
    )
}
