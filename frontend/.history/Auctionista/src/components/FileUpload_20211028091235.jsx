import React from 'react'
import '../css/Uploadview.css';

export default function FileUpload() {

   async function onFileLoad(e) {
        let files = e.target.files
        console.log(files)

        // Create a holder to store files
        let formData = new FormData()

        // add files to formData
        for (let file of files) {
            formData.append('files', file, file.name)
        }

        // send files to server
        let res = await fetch('/api/uploads', {
            method: 'POST',
            body: formData
        })

        // send back an array of strings
        let filePath = await res.json()
        console.log(filePath);

    }

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" multiple onChange={onFileLoad} />
            </label>
        </div>
    )
}
