import { useForm } from "react-hook-form";
import { useRef } from "react";
import { TCategoryPayload } from "../../../../types/categoryTypes";
import { AppDispatch } from "../../../store/Store";
import { useDispatch } from "react-redux";
import { addCategoryRequest } from "../../../store/reducers/CategoryReducers";

const AddCategory = (): JSX.Element => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const wrapperRef = useRef<any>(null);

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TCategoryPayload>();
    const dispatch: AppDispatch = useDispatch();

    const onSubmit = (data: TCategoryPayload): void => {
        const formData = new FormData();

        // Append category name
        formData.append("name", data.name);

        // Append the category image file if selected
        if (data.categoryImage instanceof File) {
            formData.append("categoryImage", data.categoryImage);
        };

        dispatch(addCategoryRequest({ data: formData, reset }));
    };

    const onDragEnter = (e: any) => {
        e.preventDefault()
        fileInputRef.current?.classList?.add('dragover')
    };

    const onDragLeave = () => wrapperRef.current?.classList?.remove('dragover');

    const onDrop = (e: any) => {
        fileInputRef.current?.classList?.remove('dragover')
        e.preventDefault()
        const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp']
        if (e.dataTransfer.files.length > 0) {
            if (allowedExtension.indexOf(e.dataTransfer.files[0].type) !== -1) {
                setValue("categoryImage", e.dataTransfer.files[0]);
            } else {
                alert('Not an image')
            }
        }
    }

    const handleDropzoneClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setValue("categoryImage", e.target.files[0]);
        }
    };

    return (
        <>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="header-title mb-3">Add Category</h4>

                        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                            {/* Category Name */}
                            <div className="position-relative mb-3">
                                <label className="form-label" htmlFor="name">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                    id="name"
                                    placeholder="Enter Category Name"
                                    {...register("name", {
                                        required: "Category Name is required",
                                    })}
                                />
                                {errors.name && (
                                    <div className="invalid-tooltip" style={{ display: "block" }}>
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>

                            {/* Dropzone for File Upload */}
                            <div className="form-group mb-3">
                                <label className="form-label">Category Image</label>
                                <div
                                    className="dropzone text-center p-3 border rounded"
                                    onClick={handleDropzoneClick}
                                    style={{ cursor: "pointer" }}
                                    onDragEnter={onDragEnter}
                                    onDragLeave={onDragLeave}
                                    onDrop={onDrop}
                                    onDragOver={onDrop}
                                    ref={wrapperRef}
                                    draggable
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="d-none"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                    />
                                    {watch("categoryImage") ? (
                                        <img
                                            src={URL.createObjectURL(watch("categoryImage") as File)}
                                            alt="preview"
                                            style={{ maxWidth: "100%", height: "auto" }}
                                        />
                                    ) : (
                                        <div className="dz-message">
                                            <i className="ri-upload-cloud-line h1"></i>
                                            <h5>Click to upload or drag image here</h5>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button className="btn btn-lg btn-primary" type="submit">
                                Create Category
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCategory;