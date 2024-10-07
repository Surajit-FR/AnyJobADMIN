import { useEffect } from "react";
import PageTitle from "../../PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/Store";
// import { getAllSubCategoryRequest } from "../../../store/reducers/SubCategoryReducers";
import { TCategory } from "../../../../types/categoryTypes";
import { getAllCategoryRequest } from "../../../store/reducers/CategoryReducers";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sub Category", link: "/service-sub-category" },
    { label: "All Sub Category" },
];

const AllSubCategory = (): JSX.Element => {
    const { categoryData } = useSelector((state: RootState) => state.categorySlice);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoryRequest("categorySlice/getAllCategoryRequest"));
        // dispatch(getAllSubCategoryRequest('subCategorySlice/getAllSubCategoryRequest'));
    }, [dispatch]);

    return (
        <>
            <PageTitle pageName="All Sub Category" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="header-title">Sub Category List</h4>
                            <p className="text-muted fs-14 mb-3">Click the sub-categories below to expand/collapse the sub-category content.</p>

                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                            aria-expanded="true" aria-controls="collapseOne">
                                            Accordion Item #1
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample">
                                        <div className="text-end">
                                            <button className="btn btn-sm btn-soft-warning m-1">Edit</button>
                                            <button className="btn btn-sm btn-soft-danger m-1">Delete</button>
                                        </div>
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
                                            plugin adds the appropriate classes that we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
                                            custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
                                            within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Accordion Item #2
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample">
                                        <div className="text-end">
                                            <button className="btn btn-sm btn-soft-warning m-1">Edit</button>
                                            <button className="btn btn-sm btn-soft-danger m-1">Delete</button>
                                        </div>
                                        <div className="accordion-body">
                                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse
                                            plugin adds the appropriate classes that we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
                                            custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
                                            within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Accordion Item #3
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample">
                                        <div className="text-end">
                                            <button className="btn btn-sm btn-soft-warning m-1">Edit</button>
                                            <button className="btn btn-sm btn-soft-danger m-1">Delete</button>
                                        </div>
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse
                                            plugin adds the appropriate classes that we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
                                            custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
                                            within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-body">
                            <p className="mb-1 fw-bold text-muted">Single Category</p>
                            <p className="text-muted fs-14">Select category to filter...</p>

                            <select className="form-control select2" data-toggle="select2">
                                <option value="">Select Category</option>
                                {categoryData &&
                                    categoryData?.map((category: TCategory) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllSubCategory;