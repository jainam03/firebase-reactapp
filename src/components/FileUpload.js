import { React, useState } from 'react';
import { storage } from '../config/firebase'
import { ref, uploadBytes } from 'firebase/storage'

const FileUpload = () => {
    const [fileUpload, setFileUpload] = useState(null)
    const uploadFile = async () => {
        if (!fileUpload) return
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
        try {
            await uploadBytes(filesFolderRef, fileUpload)
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <h1>File upload</h1>
            <div>
                <input type='file' onChange={(e) => setFileUpload(e.target.files[0])} />
                <button onClick={uploadFile} >Upload file</button>
            </div>
        </div>
    );
}

export default FileUpload;
