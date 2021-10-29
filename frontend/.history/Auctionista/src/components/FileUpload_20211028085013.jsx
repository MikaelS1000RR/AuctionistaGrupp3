import React from 'react'
import '../css/Uploadview.css';
import UploadIcon from '../assets/icons/UploadIcon.svg'

export default function FileUpload() {
    return (
        <div>
            <input type="file" accept="image/*" />
        </div>
    )
}
