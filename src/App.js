import React, { useState } from 'react';
import './style.css';

export default function App() {
  //single file
  const [selectedFile, setSelectedFile] = useState('');
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('File', selectedFile);
    fetch(
      'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  //multiple files
  const [selectedFiles, setSelectedFiles] = useState('');
  const [fileSize, setFileSize] = useState(true);
  const [areFilesPicked, setAreFilesPicked] = useState(false);

  const uploadFileHandler = (event) => {
    setSelectedFiles(event.target.files);
    setAreFilesPicked(true);
  };

  const fileSubmitHandler = (event) => {
    event.preventDefault();
    setFileSize(true);

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size > 1024) {
        setFileSize(false);
        return;
      }

      formData.append(`selectedFiles`, selectedFiles[i]);
    }
    fetch(
      'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {console.log(selectedFiles)}

      <h1>Upload</h1>
      <p> Single File</p>
      <input type="file" name="file" onChange={changeHandler} />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
        </div>
      ) : (
        <p> Select a file to show details</p>
      )}
      <button onClick={handleSubmit}> Submit</button>
      <br />

      <p>*******************</p>
      <p> Multiple Files</p>
      <form onSubmit={fileSubmitHandler}>
        <input type="file" multiple onChange={uploadFileHandler} />
        <button type="submit">Upload</button>
        {!fileSize && <p style={{ color: 'red' }}>File size exceeded!!</p>}
        {areFilesPicked ? (
          <div>
            {console.log(selectedFiles, 'selectedFiles')}
            {/* //selectedFiles ->>>> Object */}
            {/* // iterate an obj to show in UI */}
            {Object.keys(selectedFiles).map((key, index) => {
              return (
                <div key={index}>
                  <p>Filename: {selectedFiles[key].name}</p>
                  <p>Filetype: {selectedFiles[key].type}</p>
                  <p>Size in bytes: {selectedFiles[key].size}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No files picked</p>
        )}
      </form>
    </div>
  );
}
