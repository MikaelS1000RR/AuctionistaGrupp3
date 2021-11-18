import React, { useState } from 'react'
import '../css/Uploadview.css';

export default function FileUpload() {
    const[preview, setPreview]

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
        let res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })

        // send back an array of strings
        let filePath = await res.json()
        console.log(filePath);

        // clear input of files
        e.target.value = ''

    }

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" multiple  onChange={onFileLoad} />

            <img src={} alt="" />
            </label>
        </div>
    )
}
