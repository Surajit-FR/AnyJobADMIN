import { Link } from "react-router-dom";
import { TCategory } from "../../../../types/categoryTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/Store";
import { getCategoryRequest } from "../../../store/reducers/CategoryReducers";

const ListCategory = ({
    categoryStateData,
    setItemID,
    setItemName,
}: {
    categoryStateData: Array<TCategory>;
    setItemID: (id: string) => void;
    setItemName: (name: string) => void;
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h4 className="header-title mb-3">List Category</h4>

                        <div className="card mb-2 shadow-none border">
                            <div className="p-1">
                                {
                                    categoryStateData?.length > 0 ?
                                        categoryStateData?.map((category, index: number) => {
                                            return (
                                                <div className="row align-items-center m-2" key={index}>
                                                    <div className="col-auto">
                                                        <div className="avatar-sm me-2" style={{ height: "50px", width: "50px" }}>
                                                            <img
                                                                src={category?.categoryImage}
                                                                className="me-2 rounded-circle"
                                                                alt="icon"
                                                                height="100%"
                                                                width="100%"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col ps-0">
                                                        <Link to="#" className="text-muted fw-bold">{category?.name}</Link>
                                                        <p className="m-0 p-0">${category.serviceCost}</p>
                                                    </div>
                                                    <div className="col-auto px-2" id="tooltip-container9">
                                                        {/* <Link to="#" data-bs-container="#tooltip-container9" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete"
                                                        className="btn btn-link btn-lg p-0">
                                                        <i className='ri-information-line'></i>
                                                    </Link> */}

                                                        <button
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#centermodal"
                                                            className="btn btn-sm btn-soft-secondary mx-2"
                                                            onClick={() => dispatch(getCategoryRequest({ categoryId: category?._id }))}
                                                        >
                                                            <i className='ri-pencil-line'></i>
                                                        </button>

                                                        <button
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-alert-modal"
                                                            className="btn btn-sm btn-soft-danger"
                                                            onClick={() => {
                                                                setItemID(category?._id)
                                                                setItemName(category?.name)
                                                            }}
                                                        >
                                                            <i className='ri-delete-bin-line'></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : <h4 className="m-2">No category data present</h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListCategory;