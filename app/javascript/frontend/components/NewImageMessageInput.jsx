import React, { useState, useEffect, useRef } from "react";
import SendMessageButton from "./SendMessageButton";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { postResource, postResource2 } from "../utils/apiRequest";

export default function NewImageMessageInput() {
  const { userInfo } = useUserInfoContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  /* useEffect to handle the image preview */
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
      setSelectedFile(null);
    };
  }, [selectedFile]);

  const onSelectFile = (e) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  /* for placing the image into the input field if using the upload button 
  instead of drag and drop */
  const uploadClickHandler = () => {
    inputRef.current.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Message must have content");
      return;
    }

    const body = new FormData();
    body.append("image", selectedFile);
    body.append("chat_id", userInfo.current_chat_id);

    const dataHandler = (data) => {
      if (data.hasOwnProperty("errors")) {
        errorSetter(data.errors.join(", "));
      } else {
        setUploadImage(false);
        setError(null);
      }
    };

    //postResource("/api/v1/image_messages/create", body, "POST", dataHandler);

    postResource2("/api/v1/image_messages/create", body, "POST")
      .then((data) => dataHandler(data))
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div className="flex flex-col items-center">
        {error && <span className="text-xs">{error}</span>}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="w-full border py-1 px-5 rounded-full text-sm flex gap-1 items-end justify-center"
        >
          {selectedFile && (
            <img
              src={preview}
              className="max-w-[150px] max-h-[150px] rounded-md"
            />
          )}
          {!selectedFile && (
            <>
              <label className="text-sm text-gray-400" htmlFor="file">
                drag and drop image...
              </label>
              <span className="text-sm text-gray-400">or</span>
              <button
                className="text-sm lowercase underline text-gray-400"
                onClick={uploadClickHandler}
              >
                Click to Upload
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
      <SendMessageButton submitHandler={submitMessage} />
    </>
  );
}
