import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import DerivedQuestionComponent from "./DerivedQuestionComponent";
import { DerivedQuestion, TAddQuestionPayload } from "../../../../types/questionTypes";
import { useState } from "react";

type QuestionProps = {
    question: any;
    qIndex: number;
    remove: (index: number) => void;
    control: any;
    register: UseFormRegister<TAddQuestionPayload>;
    setValue: UseFormSetValue<TAddQuestionPayload>;
    watch: UseFormWatch<TAddQuestionPayload>;
}

const Question = ({ question, qIndex, remove, register, setValue, watch }: QuestionProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const addOption = () => {
        const existingOptions = watch(`questionArray.${qIndex}.options`) || {};
        const optionKeys = Object.keys(existingOptions);
        const nextKey = String.fromCharCode(65 + optionKeys.length); // Automatically assign A, B, C, etc.

        const optionLabel = prompt("Enter option label:");
        if (optionLabel) {
            const updatedOptions = { ...existingOptions, [nextKey]: optionLabel };
            setValue(`questionArray.${qIndex}.options`, updatedOptions);
        }
    };

    const removeOption = (optionKey: string) => {
        const options = { ...watch(`questionArray.${qIndex}.options`) || {} };
        delete options[optionKey];
        setValue(`questionArray.${qIndex}.options`, options);

        const derivedQuestions = watch(`questionArray.${qIndex}.derivedQuestions`) || [];
        const updatedDerivedQuestions = derivedQuestions.filter(dq => dq.option !== optionKey);
        setValue(`questionArray.${qIndex}.derivedQuestions`, updatedDerivedQuestions);
    };

    const addDerivedQuestion = (optionKey: string) => {
        const derivedQuestions = watch(`questionArray.${qIndex}.derivedQuestions`) || [];
        const newDerivedQuestion: DerivedQuestion = {
            option: optionKey,
            question: "",
            options: {},
            derivedQuestions: [],
        };
        setValue(`questionArray.${qIndex}.derivedQuestions`, [...derivedQuestions, newDerivedQuestion]);
    };

    return (
        <>
            <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #464f5b", borderRadius: "5px" }}>
                {/* Header section with collapse button */}
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="card-title mb-2">Question {qIndex + 1}</h4>
                    <button type="button" className="btn btn-sm btn-secondary" onClick={toggleCollapse}>
                        {isCollapsed ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>}
                    </button>
                </div>

                {/* Collapsible section */}
                {!isCollapsed && (
                    <>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Question"
                                {...register(`questionArray.${qIndex}.question`)}
                                style={{ width: "60%", marginRight: "20px" }}
                            />
                            <button type="button" className="btn btn-sm btn-info mx-2" onClick={addOption}>
                                Add Option
                            </button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => remove(qIndex)}>
                                <i className="ri-delete-bin-6-line"></i>
                            </button>
                        </div>

                        {Object.entries(watch(`questionArray.${qIndex}.options`) || {}).map(([optionKey, optionLabel]) => (
                            <div className="mt-2" key={optionKey}>
                                <span>{optionKey}: {optionLabel}</span>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-info mx-2"
                                    onClick={() => addDerivedQuestion(optionKey)}
                                >
                                    Add Derived Question
                                </button>
                                <button type="button" className="btn btn-sm btn-outline-danger mx-2" onClick={() => removeOption(optionKey)}>
                                    <i className="ri-delete-bin-6-line"></i>
                                </button>
                            </div>
                        ))}

                        {watch(`questionArray.${qIndex}.derivedQuestions`)?.map((derivedQuestion, dIndex) => (
                            <DerivedQuestionComponent
                                key={dIndex}
                                qIndex={qIndex}
                                dIndex={dIndex}
                                setValue={setValue}
                                watch={watch}
                                register={register}
                            />
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default Question;