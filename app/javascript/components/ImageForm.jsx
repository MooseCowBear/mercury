import React, { useState, useEffect, useRef } from "react";

export default ImageForm = ({ currentRoom, setUploadImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const imageURL = URL.createObjectURL(selectedFile);
    setPreview(imageURL);

    return () => {
      URL.revokeObjectURL(imageURL);
      setPreview(null);
      setSelectedFile(null); //clean up.. want the form reset.
    };
  }, [selectedFile]);

  const onSelectFile = (e) => {
    //this works...
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const cancelHandler = () => {
    setPreview(null);
    setSelectedFile(null);
    setUploadImage(false);
  };

  const uploadClickHandler = () => {
    inputRef.current.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("in handle drag");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("dropped");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // TODO: set up backend then finish this:

  const submitHandler = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Message must have content");
      return;
    }

    // TODO: the post to backend...

    //when finished want to go back to text form..
    setUploadImage(false);
  };

  return (
    <div className="flex gap-3 items-center">
      <button onClick={cancelHandler} aria-label="cancel">
        <svg
          className="h-9 w-9 fill-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill=""
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </button>
      <form
        onSubmit={submitHandler}
        className="rounded-md md:pt-3 md:pb-5 flex items-stretch justify-stretch gap-3 w-full dark:bg-gray-700"
      >
        <div className="flex flex-col w-full">
          {error && <span className="text-sm text-coolpink-500">{error}</span>}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className="bg-[#ffffff] px-3 py-2 border-2 border-gray-200 rounded-xl w-full text-sm dark:bg-gray-800 dark:border-gray-500 flex flex-col items-center justify-center"
          >
            {selectedFile && (
              <img src={preview} className="w-[130px] rounded-md" />
            )}
            {!selectedFile && (
              <>
                <label
                  className="text-xs uppercase text-gray-400"
                  htmlFor="file"
                >
                  Drag and drop a file
                </label>
                <span className="text-xs text-gray-400">or</span>
                <button className="upload-button" onClick={uploadClickHandler}>
                  Upload a file
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={onSelectFile}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>
        <button type="submit" aria-label="Send">
          <svg
            className="h-9 w-9 fill-teal-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};
