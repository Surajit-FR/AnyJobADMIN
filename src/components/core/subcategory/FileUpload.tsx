import React from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { SubCategory } from "../../../../types/common";

interface FileUploadProps {
    fileInputRef: React.RefObject<HTMLInputElement>;
    watch: UseFormWatch<SubCategory>;
    setValue: UseFormSetValue<SubCategory>;
}

const FileUpload = ({ fileInputRef, watch, setValue }: FileUploadProps) => {
    const handleDropzoneClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setValue("image", e.target.files[0]);
        }
    };

    return (
        <>
            <div className="form-group mb-3">
                <label className="form-label">Sub Category Image</label>
                <div
                    className="dropzone text-center p-3 border rounded"
                    onClick={handleDropzoneClick}
                    style={{ cursor: "pointer" }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="d-none"
                        onChange={handleImageUpload}
                    />
                    {watch("image") ? (
                        <img
                            src={URL.createObjectURL(watch("image") as File)}
                            alt="Sub Category Preview"
                            style={{ maxWidth: "100p%", height: "auto" }}
                        />
                    ) : (
                        <div className="dz-message">
                            <i className="ri-upload-cloud-line h1"></i>
                            <h5>Click to upload or drag image here</h5>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FileUpload;