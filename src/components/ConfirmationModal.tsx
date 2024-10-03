type ConfirmationModalProps = {
    modalId: string;
    modalText: string;
    onDelete: () => void;
}


const ConfirmationModal = ({ modalId, modalText, onDelete }: ConfirmationModalProps): JSX.Element => {
    return (
        <>
            <div id={modalId} className="modal fade" tabIndex={-1} role="dialog"
                aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-body p-4">
                            <div className="text-center">
                                <i className="ri-information-line h1 text-info"></i>
                                <h4 className="mt-2">Heads up!</h4>
                                <p className="mt-3">{modalText}</p>
                                <button
                                    type="button"
                                    className="btn btn-info my-2"
                                    data-bs-dismiss="modal"
                                    onClick={onDelete}
                                >Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModal;