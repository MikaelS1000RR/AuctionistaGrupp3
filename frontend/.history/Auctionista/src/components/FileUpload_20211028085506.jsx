import React from 'react'
import '../css/Uploadview.css';

export default function FileUpload() {

    

    return (
        <div>
            <label class="fileupload">
            <input type="file" accept="image/*" />
            </label>
        </div>
    )
}
