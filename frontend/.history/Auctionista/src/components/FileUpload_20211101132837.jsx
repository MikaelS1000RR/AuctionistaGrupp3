import React, { useState } from 'react'
import '../css/Uploadview.css';


export default function FileUpload() {
    // check if something happens
    const[preview, setPreview] = useState('')

    
    // const filterBySize = (file) => {
    //     return file.size <= 1e+7;
    // }

   async function onFileLoad(e) {
        let files = e.target.files
        console.log(files)

        // Create a holder to store files
        let formData = new FormData()

        // add files to formData
        for (let file of files) {


            let image = new Image()
            image.src = URL.createObjectURL(file)

            image.onload = async () => {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                canvas.width = image.width
                canvas.height = image.height
                
                ctx.drawImage(image, 0, 0)

                // compress image to 80% quality
                let compressedFile = dataURItoBlob(canvas.toDataURL('image/jpeg', 0.8))
                console.log(compressedFile);
                // change file type to jpg


                // solution maybe? 
                // const files = event.target.files;

                // for (let i = 0; i < files.length; i++) {
                //     formData.append(`images[${i}]`, files[i])
                // }
                
        
                    formData.append('files', compressedFile, file.name.replace(/\.\w{3, 5}$/, '.jpg'))


       

       // send files to server
        let res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        
        // send back an array of strings
        let filePaths = await res.json()
        console.log(filePaths[0]);

        setPreview(filePaths[0])
        // clear input of files
        e.target.value = ''

        }
    
    }

   


}

    return (
        <div>
            <label className="fileupload">
            <input type="file" accept="image/*" multiple onChange={onFileLoad} />

            <img src={preview} className="img-preview" alt="" />

            </label>
        </div>
    )

    
}

  // helper function to convert canvas image to file
  // should be in a utility file
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

 
