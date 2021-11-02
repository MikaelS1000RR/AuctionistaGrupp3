import React, { useState } from 'react'
import '../css/Uploadview.css';
import Utility from '../Utility.jsx';

export default function FileUpload() {
    // check if something happens
    const[preview, setPreview] = useState('')

   
 let b = new Utility();
 let a = b.fil

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
                canvas.width = image.width
                canvas.height = image.height

                ctx.drawImage(image, 0, 0)

                let compressedFile = dataURItoBlob(canvas.toDataURL('image/jpeg', 0.8))

                formData.append('files', compressedFile, file.name)
       

       // send files to server
        let res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })

        // send back an array of strings
        let filePaths = await res.json()
        console.log(filePaths[0]);

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

  // helper function to convert canvas image to file
  function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], {type: mimeString});
    return blob;
  }

 
