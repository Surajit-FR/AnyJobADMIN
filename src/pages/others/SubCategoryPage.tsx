import { useRef, useState } from "react";
import PageTitle from "../../components/PageTitle";
import DerivedQuestionComponent, { DerivedQuestion } from "../../components/core/subcategory/DerivedQuestionComponent";

const breadcrumbs = [
    { label: "AnyJob", link: "/dashboard" },
    { label: "Sub Category" }
];

// Mock categories for dropdown
const categories = [
    { id: 1, name: 'Plumbing' },
    { id: 2, name: 'Electrical' },
    { id: 3, name: 'HVAC' },
];

export type Question = {
    question: string;
    options: { [key: string]: string };
    derivedQuestions?: DerivedQuestion[];
    selectedOptionIndex?: number;
};

export type SubCategory = {
    name: string;
    image: File | null;
    categoryId: number | null;
    questions: Question[];
}

const SubCategoryPage = (): JSX.Element => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDropzoneClick = (): void => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const [formData, setFormData] = useState<SubCategory>({
        name: "",
        image: null,
        categoryId: null,
        questions: [],
    });

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            categoryId: parseInt(e.target.value),
        });
    };

    const handleSubCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            name: e.target.value,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        }
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            question: '',
            options: {},
            derivedQuestions: [],
            selectedOptionIndex: undefined,
        };
        setFormData((prevData) => ({
            ...prevData,
            questions: [...prevData.questions, newQuestion],
        }));
    };

    const handleQuestionInputChange = (qIndex: number, field: string, value: string) => {
        console.log({ value });

        setFormData((prevFormData) => {
            const newQuestions = [...prevFormData.questions];
            const keys = field.split('.');
            let target = newQuestions[qIndex];

            // Iterate through keys to find the target object
            keys.forEach((key, index) => {
                if (key.includes('derivedQuestions')) {
                    const derivedIndex = parseInt(key.match(/\d+/)?.[0] || '0');
                    if (!target.derivedQuestions) target.derivedQuestions = [];
                    target = target.derivedQuestions[derivedIndex];
                } else if (index === keys.length - 1) {
                    // Type assertion to ensure TypeScript knows this key exists
                    (target as any)[key] = value; // Use 'any' temporarily
                }
            });

            return {
                ...prevFormData,
                questions: newQuestions,
            };
        });
    };

    const handleOptionSelect = (qIndex: number, selectedIndex: number) => {
        const newQuestions = [...formData.questions];
        newQuestions[qIndex].selectedOptionIndex = selectedIndex;
        setFormData({
            ...formData,
            questions: newQuestions,
        });
    };

    const addOption = (qIndex: number) => {
        const newQuestions = [...formData.questions];
        const newKey = String.fromCharCode(65 + Object.keys(newQuestions[qIndex].options).length); // Generate option keys (A, B, C, ...)
        newQuestions[qIndex].options[newKey] = ''; // Initialize with an empty string
        setFormData({
            ...formData,
            questions: newQuestions,
        });
    };

    const updateOption = (qIndex: number, key: string, value: string) => {
        setFormData((prevFormData) => {
            const newQuestions = [...prevFormData.questions];

            newQuestions[qIndex].options[key] = value; // Set the value for the specific key
            return {
                ...prevFormData,
                questions: newQuestions,
            };
        });
    };

    const addDerivedQuestion = (qIndex: number, optionIndex?: number) => {
        setFormData((prevFormData) => {
            const newQuestions = [...prevFormData.questions];
            const targetQuestion = optionIndex !== undefined
                ? newQuestions[qIndex].derivedQuestions![optionIndex]
                : newQuestions[qIndex];

            if (!targetQuestion.derivedQuestions) {
                targetQuestion.derivedQuestions = []; // Initialize if undefined
            }

            targetQuestion.derivedQuestions.push({
                option: '',
                question: '',
                options: { 'Option 1': '' }, // Initialize as an object
                derivedQuestions: [],
            });

            return {
                ...prevFormData,
                questions: newQuestions,
            };
        });
    };


    return (
        <>
            <PageTitle pageName="Sub Category" breadcrumbs={breadcrumbs} />

            <div className="row">
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Create Sub Category</h4>

                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="category-select">Select Category</label>
                                <select
                                    id="category-select"
                                    className="form-select"
                                    value={formData.categoryId ?? ""}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    {categories.map((category) => (
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
                                    value={formData.name}
                                    onChange={handleSubCategoryNameChange}
                                />
                            </div>

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
                                    {formData.image ? (
                                        <img
                                            src={URL.createObjectURL(formData.image)}
                                            alt="Sub Category Preview"
                                            style={{ maxWidth: "100px", height: "auto" }}
                                        />
                                    ) : (
                                        <div className="dz-message">
                                            <i className="ri-upload-cloud-line h1"></i>
                                            <h5>Click to upload or drag image here</h5>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Add Questions</h4>

                            {formData.questions.map((question, qIndex) => (
                                <div key={qIndex} className="mb-4">
                                    <label className="form-label">Question {qIndex + 1}</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Enter Question"
                                        value={question.question}
                                        onChange={(e) =>
                                            handleQuestionInputChange(qIndex, "question", e.target.value)
                                        }
                                    />

                                    <div className="mb-2">
                                        <label className="form-label me-2">Options</label>
                                        {Object.entries(question.options).map(([key, value], oIndex) => (
                                            <div key={oIndex} className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name={`question${qIndex}`}
                                                    checked={question.selectedOptionIndex === oIndex}
                                                    onChange={() => handleOptionSelect(qIndex, oIndex)}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    value={value}
                                                    placeholder={`Option ${key}`}
                                                    onChange={(e) => updateOption(qIndex, key, e.target.value)} // Call the update function
                                                />
                                            </div>
                                        ))}

                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => addOption(qIndex)}
                                        >
                                            Add Option
                                        </button>
                                    </div>

                                    {/* Render Derived Questions */}
                                    {question.derivedQuestions?.map((derived, dIndex) => (
                                        <DerivedQuestionComponent
                                            key={dIndex}
                                            derivedQuestion={derived}
                                            questionIndex={qIndex}
                                            derivedQuestionIndex={dIndex}
                                            addDerivedQuestion={addDerivedQuestion}
                                            handleDerivedQuestionInputChange={(field, value) =>
                                                handleQuestionInputChange(qIndex, `derivedQuestions[${dIndex}].${field}`, value)
                                            }
                                        />
                                    ))}

                                    {question.derivedQuestions && question.selectedOptionIndex !== undefined && (
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => addDerivedQuestion(qIndex)}
                                        >
                                            Add Derived Question
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button className="btn btn-outline-success" onClick={addQuestion}>
                                Add Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </>
    );
};

export default SubCategoryPage;