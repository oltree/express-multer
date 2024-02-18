import axios from 'axios';
import { useCallback, useState } from 'react';

import './App.css';

export const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState('');

  const handleSendFile = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('image', file as File);

      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formData
      );

      setImage('http://localhost:5000/' + response.data.path);
    } catch (error) {
      console.error(error);
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  return (
    <div className='app'>
      <div className='avatarContainer'>
        <img src={image} alt='avatar' className='avatar' />
      </div>

      <div className='form'>
        <input type='file' className='input' onChange={handleFileChange} />
        <button className='button' onClick={handleSendFile}>
          Change avatar
        </button>
      </div>
    </div>
  );
};
