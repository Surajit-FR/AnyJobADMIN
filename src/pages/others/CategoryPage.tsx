import { useDispatch, useSelector } from "react-redux";
import AddCategory from "../../components/core/category/AddCategory";
import ListCategory from "../../components/core/category/ListCategory";
import PageTitle from "../../components/PageTitle";
import { AppDispatch, RootState } from "../../store/Store";
import { useEffect, useState } from "react";
import { deleteCategoryRequest, getAllCategoryRequest } from "../../store/reducers/CategoryReducers";
import { TCategory } from "../../../types/categoryTypes";
import UpdateCategoryModal from "../../components/core/category/UpdateCategoryModal";
import ConfirmationModal from "../../components/ConfirmationModal";


const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Category" }
];

const CategoryPage = (): JSX.Element => {
    const { categoryData } = useSelector((state: RootState) => state.categorySlice);
    const dispatch: AppDispatch = useDispatch();
    const [categoryStateData, setCategoryStateData] = useState<Array<TCategory>>();
    const [itemId, setItemID] = useState<string>("");
    const [itemName, setItemName] = useState<string>("");

    const handleDelete = () => {
        dispatch(deleteCategoryRequest({ categoryId: itemId }));
    };
    useEffect(() => {
        dispatch(getAllCategoryRequest("categorySlice/getAllCategoryRequest"));
    }, [dispatch]);

    useEffect(() => {
        setCategoryStateData(categoryData as Array<TCategory>);
    }, [categoryData]);


    return (
        <>
            {/* PageTitle section */}
            <PageTitle pageName="Category" breadcrumbs={breadcrumbs} />

            {/* UpdateCategoryModal */}
            <UpdateCategoryModal />

            {/* ConfirmationModal */}
            <ConfirmationModal
                modalId="delete-alert-modal"
                modalText={`Want To Delete The Category "${itemName}"?`}
                onDelete={handleDelete}
            />

            <div className="row">
                {/* ListCategory Section */}
                <ListCategory
                    categoryStateData={categoryStateData as Array<TCategory>}
                    setItemID={setItemID}
                    setItemName={setItemName}
                />
                {/* AddCategory Section */}
                <AddCategory />
            </div>
        </>
    );
};

export default CategoryPage;