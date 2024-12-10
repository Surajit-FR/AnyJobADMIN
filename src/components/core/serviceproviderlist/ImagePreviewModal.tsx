import { useEffect } from "react";

const ImagePreviewModal = ({ imageUrl, onClose }: { imageUrl: string | null; onClose: () => void }) => {
    useEffect(() => {
        const modalElement = document.getElementById("imagePreviewModal");
        if (modalElement) {
            const bootstrapModal = new window.bootstrap.Modal(modalElement);
            if (imageUrl) {
                bootstrapModal.show();
            } else {
                bootstrapModal.hide();
            }
        }
    }, [imageUrl]);

    return (
        <div
            className="modal fade"
            id="imagePreviewModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="imagePreviewModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="imagePreviewModalLabel">Image Preview</h4>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body text-center">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Preview" className="img-fluid" style={{ width: "100%", height: "100%" }} />
                        ) : (
                            <p>No image selected.</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Download</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePreviewModal;