import '../css/Uploadview.css';
import UploadIcon from '../assets/icons/UploadIcon.svg'
import FileUpload from '../components/FileUpload';

const Upload = () => {
  return (
    <div className="uploadview">
      <p className="backroute">Back</p>
      <h1 className="uploadtitle">Upload</h1>
      
      <form action="">
        <div className="inputwrap">
          <input type="text" placeholder="Title"/>
        </div>
        <div className="inputwrap">
          <input type="text" placeholder="Brand"/>
        </div>
        <div className="inputwrap">
          <input type="text" placeholder="Details (single or commaseparated list)"/>
        </div>
        <div className="inputwrap">
          <input type="text"placeholder="Category"/>
        </div>
        <div className="inputwrap">
          <input type="text" placeholder="Starting price"/>
        </div>
        <div className="inputwrap">
          <input type="text" placeholder="End date"/>
        </div>
        <div className="inputwrap">
          <input type="text" placeholder="Condition"/>
        </div>
        <div className="inputwrap">
          <input type="text" placeholder="Location"/>
        </div>
        <div className="inputwrap">
          <textarea name="" id="" cols="30" rows="5" placeholder="Description"></textarea>
        </div>
        {/* <div className="inputwrap">
          <button className="imageuploadbtn">+Add image</button>
        </div> */}
       
      </form>
      <hr className="break"/>
      <div className="uploadbtn-wrap">
        <button className="uploadbtn"><img src={UploadIcon} className="uploadicon"/> Upload</button>
      </div>
    </div>
   );
}
 
export default Upload;