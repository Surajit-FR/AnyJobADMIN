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
import { CheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QD1hlLLbJPDR1xRu3w0FbIG9QHRcii7pU5qLNKi0ZVeXSvDLXKvU1q3xYcbjom8xDlUGVCzdaSMMdCcIGZzrpvK00TlNvPNkp');

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Category" }
];

const CheckoutForm = () => {
    const checkout = useCheckout();

    const handleSubmit = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        const result = await checkout.confirm();

        if (result.type === 'error') {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button>Submit</button>
        </form>
    );
};

const CategoryPage = (): JSX.Element => {
    const { categoryData } = useSelector((state: RootState) => state.categorySlice);
    const dispatch: AppDispatch = useDispatch();
    const [categoryStateData, setCategoryStateData] = useState<Array<TCategory>>();
    const [itemId, setItemID] = useState<string>("");
    const [itemName, setItemName] = useState<string>("");

    const handleDelete = () => {
        dispatch(deleteCategoryRequest({ categoryId: itemId }));
    };
    const fetchClientSecret = () => {
        return fetch('https://dashboard.stripe.com/v1/billing_portal/sessions', {
            method: 'POST', body: JSON.stringify({ customer: "cus_R5DHR5Kqu6LoSB", return_url: "https://dashboard.stripe.com/test/customers/cus_R5DHR5Kqu6LoSB" }),
            headers: { 'Authorization': `Bearer sk_test_51QD1hlLLbJPDR1xRNXBN7HxyJ3frpc9Q1wkvYi63oRTuXvFnNC7R9VkfCQysQYMBqFNxGdHA2C852jflahGUygds00o57KpNmN`, }
        })
            .then((response) => response.json())
            .then((json) => json.checkoutSessionClientSecret)
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
            <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
                <CheckoutForm />
            </CheckoutProvider>
        </>
    );
};

export default CategoryPage;