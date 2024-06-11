import { onFileUploadClassroom } from "@/functions/Upload/onUploadImageClassroom.telefunc";

import { useState } from 'react';


export default function FileUpload() {

    const [file, setFile] = useState(null);
    const [result, setResult] = useState('');

    
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64url = reader.result as string;
            onFileUploadClassroom(base64url, { filename: "salon12", classroomId: "Zlag3Ie9fjQ92Qa30gigK" });
            setResult('Upload successful');
        }



    }
    

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept="*/*" required />
            <button type="submit">Upload</button>
          </form>
          <div id="result">{result}</div>
        </div>
      );
}
