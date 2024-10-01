import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import PageTitle from "../../components/PageTitle";
import { Category, SubCategory } from "../../../types/common";
import FileUpload from "../../components/core/subcategory/FileUpload";
import Question from "../../components/core/subcategory/Question";
import { Link } from "react-router-dom";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sub Category" }
];

const SubCategoryPage = (): JSX.Element => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { register, handleSubmit, control, setValue, watch } = useForm<SubCategory>({
        defaultValues: {
            name: "",
            image: null,
            categoryId: "",
            questionArray: [{ question: "", options: {}, derivedQuestions: [] }]
        }
    });

    const { fields: questions, append, remove } = useFieldArray({
        control,
        name: "questionArray"
    });

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = () => {
            const mockCategories = [
                { id: "650c4c26e48c46227c275b2e", name: "Category 1" },
                { id: "650c4c26e48c46227c275b3f", name: "Category 2" },
                { id: "650c4c26e48c46227c275b4a", name: "Category 3" },
            ];
            setCategories(mockCategories);
        };
        fetchCategories();
    }, []);

    const handleFormSubmit = (data: SubCategory) => {
        if (!data.categoryId) {
            alert("Please select a category.");
            return;
        }

        // Create a new FormData object
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("categoryId", data.categoryId);

        // Append the image file (if exists)
        if (data.image instanceof File) {
            formData.append("subCategoryImage", data.image);
        };

        formData.append("questionArray", JSON.stringify(data.questionArray));

        Array.from(formData.entries()).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
    };

    return (
        <>
            <PageTitle pageName="Sub Category" breadcrumbs={breadcrumbs} />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4 className="card-title">Create Sub Category</h4>
                                <Link className="btn btn-sm btn-dark" to="/all-sub-category">All Sub Category</Link>
                            </div>
                            <hr />
                            
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <div className="row">
                                    <div className="col-lg-4 pe-3 my-2">
                                        <div className="form-group mb-3">
                                            <label className="form-label" htmlFor="category-select">Select Category</label>
                                            <select
                                                id="category-select"
                                                className="form-select"
                                                {...register("categoryId")}
                                            >
                                                <option value="" disabled>Select Category</option>
                                                {categories.map((category: Category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group mb-3">
                                            <label className="form-label" htmlFor="subCategoryName">Sub Category Name</label>
                                            <input
                                                type="text"
                                                id="subCategoryName"
                                                className="form-control"
                                                placeholder="Enter Sub Category Name"
                                                {...register("name")}
                                            />
                                        </div>

                                        <FileUpload
                                            fileInputRef={fileInputRef}
                                            watch={watch}
                                            setValue={setValue}
                                        />
                                    </div>

                                    <div className="col-lg-8">
                                        <button type="button" className="btn btn-sm btn-success mb-2" onClick={() => append({ question: "", options: {}, derivedQuestions: [] })}>
                                            Add Question
                                        </button>
                                        {questions.map((question, qIndex) => (
                                            <Question
                                                key={question.id}
                                                question={question}
                                                qIndex={qIndex}
                                                remove={remove}
                                                control={control}
                                                register={register}
                                                setValue={setValue}
                                                watch={watch}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg">Create Sub Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategoryPage;