import React, { useState } from 'react'
import '../css/Uploadview.css';
import Utility from '../Utility.jsx';

export default function FileUpload() {
    // check if something happens
    const[preview, setPreview] = useState('')

   async function onFileLoad(e) {
        let files = e.target.files
        console.log(files)

        // Create a holder to store files
        let formData = new FormData()

        // add files to formData
        for (let file of files) {


            let image = new Image()
            image.src = URL.createObjectURL(file)

            image.onload = () => {
                let canvas = document.querySelector('canvas')
                let ctx = canvas.getContext('2d')
                canvas.width = image.w

                canvas.drawImage(image, 0, 0)
            }

            formData.append('files', file, file.name)
        }

       // send files to server
        // let res = await fetch('/api/upload', {
        //     method: 'POST',
        //     body: formData
        // })

        // send back an array of strings
        // let filePath = await res.json()
        // console.log(filePath);

       // setPreview(filePath[0])

        // clear input of files
        e.target.value = ''

    }

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" multiple  onChange={onFileLoad} />

            <img src={preview} className="img-preview" alt="" />

            <canvas></canvas>
            </label>
        </div>
    )
}
