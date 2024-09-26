import { useRef } from "react";

const AddCategory = (): JSX.Element => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDropzoneClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <div className="col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="header-title mb-3">Add Category</h4>

                        <form className="needs-validation" noValidate>
                            <div className="position-relative mb-3">
                                <label className="form-label" htmlFor="validationTooltip01">Category Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="validationTooltip01"
                                    placeholder="Enter Category Name"
                                // style={{
                                //     borderColor: "#fa9189"
                                // }}
                                />
                                <div className="valid-tooltip"
                                // style={{ display: "block" }}
                                >
                                    Looks good!
                                </div>
                                <div className="invalid-tooltip"
                                // style={{ display: "block" }}
                                >
                                    Please enter first name.
                                </div>
                            </div>

                            <div className="position-relative mb-3 dropzone" onClick={handleDropzoneClick} style={{ cursor: 'pointer' }}>
                                <input
                                    ref={fileInputRef}
                                    name="file"
                                    type="file"
                                    multiple
                                />

                                <div className="dz-message needsclick">
                                    <i className="h1 text-muted ri-upload-cloud-2-line"></i>
                                    <h3>Drop files here or click to upload.</h3>
                                    <span className="text-muted fs-13">
                                        (Please add a <strong>Category Image</strong>)
                                    </span>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCategory;