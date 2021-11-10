import React, { useState } from 'react'
import '../css/Uploadview.css';
import { useImageContext } from '../contexts/ImageContextProvider';
import { useProductContextProvider } from '../contexts/ProductContextProvider';


export default function FileUpload() {
    
  //  const[ selectedFiles, setSelectedFiles] = useState([])

    const { images, setImages } = useImageContext()
    const {latestProduct, setLatestProduct} = us

   async function onFileLoad(e) {
       
       if (e.target.files) {
			// const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            // setImages((prevImages) => prevImages.concat(filesArray));
			// Array.from(e.target.files).map(
            //     (file) => URL.revokeObjectURL(file) // avoid memory leak
            //     );
            
            
        // Create a holder to store files
        let files = e.target.files
        let formData = new FormData()


        let loadedImages = []
       

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
              //  let compressedFile = dataURItoBlob(canvas.toDataURL('image/jpeg', 0.8))
            //     console.log(compressedFile);
                let compressedFile = canvas.toDataURL('image/jpeg', 0.8)
                // change file type to jpg
               // formData.append('files', compressedFile, file.name.replace(/\.\w{3, 5}$/, '.jpg'))
               loadedImages.push(compressedFile)
               if(loadedImages.length == files.length) {
                   setImages(loadedImages)
               }




       // send files to server
       
       // send back an array of strings
       
       // let filePaths = await res.json()
       
       
       //    console.log(filePaths[0]);
       
       
       //     // change setPreview
       //     setPreview(filePaths[0])


       let res = await fetch('/api/upload', { 
           method: 'POST',
           body: formData
       }).then((response) => response.json())
       .then((result) => {
           console.log('Success:', result);
       })
       .catch((error) => {
           console.error('Error:', error);
       });
       
       
       // // clear input of files
       // e.target.value = ''
       
    }
  
 }

}


}

const renderPhotos = (source) => {
		return source.map((photo) => {
			return <img src={photo} alt="" key={photo} style={styles.img}/>;
		});
	};

    return (
        <div>
            <label className="fileupload">
            <input type="file" multiple accept="image/*" onChange={onFileLoad} />
            <div className="result">{renderPhotos(images)}</div>

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

 
const styles = {
    img: {
        width: '320px',
        height: '180px',
        objectFit: 'cover',
        padding: '0.75rem'
      },
      
   
}