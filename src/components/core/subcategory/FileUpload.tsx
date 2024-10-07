import React from "react";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";
import { TSubCategoryPayload } from "../../../../types/subCategoryTypes";

interface FileUploadProps {
    fileInputRef: React.RefObject<HTMLInputElement>;
    watch: UseFormWatch<TSubCategoryPayload>;
    setValue: UseFormSetValue<TSubCategoryPayload>;
}

const FileUpload = ({ fileInputRef, watch, setValue }: FileUploadProps) => {
    const handleDropzoneClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setValue("subCategoryImage", e.target.files[0]);
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
                    {watch("subCategoryImage") ? (
                        <img
                            src={URL.createObjectURL(watch("subCategoryImage") as File)}
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