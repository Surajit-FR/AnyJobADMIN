import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { DerivedQuestion, SubCategory } from "../../../../types/common";
import DerivedQuestionComponent from "./DerivedQuestionComponent";

type QuestionProps = {
    question: any;
    qIndex: number;
    remove: (index: number) => void;
    control: any;
    register: UseFormRegister<SubCategory>;
    setValue: UseFormSetValue<SubCategory>;
    watch: UseFormWatch<SubCategory>;
}

const Question = ({ question, qIndex, remove, register, setValue, watch }: QuestionProps) => {
    const addOption = () => {
        const optionKey = prompt("Enter option key (e.g., A, B, C):");
        const optionLabel = prompt("Enter option label:");
        if (optionKey && optionLabel) {
            const updatedOptions = { ...watch(`questionArray.${qIndex}.options`), [optionKey]: optionLabel };
            setValue(`questionArray.${qIndex}.options`, updatedOptions);
        }
    };

    const removeOption = (optionKey: string) => {
        const options = { ...watch(`questionArray.${qIndex}.options`) };
        delete options[optionKey];
        setValue(`questionArray.${qIndex}.options`, options);
    };

    const addDerivedQuestion = (optionKey: string) => {
        const derivedQuestions = watch(`questionArray.${qIndex}.derivedQuestions`);
        if (!derivedQuestions.some(dq => dq.option === optionKey)) {
            const newDerivedQuestion: DerivedQuestion = {
                option: optionKey,
                question: "",
                options: {},
                derivedQuestions: [],
            };
            setValue(`questionArray.${qIndex}.derivedQuestions`, [...derivedQuestions, newDerivedQuestion]);
        } else {
            alert("Derived question for this option already exists.");
        }
    };

    return (
        <>
            <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #464f5b", borderRadius: "5px" }}>
                <h4 className="card-title">Question {qIndex + 1}</h4>
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

                {Object.entries(watch(`questionArray.${qIndex}.options`)).map(([optionKey]) => (
                    <div className="mt-2" key={optionKey}>
                        <span>{optionKey}: {watch(`questionArray.${qIndex}.options.${optionKey}`)}</span>
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

                {watch(`questionArray.${qIndex}.derivedQuestions`).map((derivedQuestion, dIndex) => (
                    <DerivedQuestionComponent
                        key={dIndex}
                        qIndex={qIndex}
                        dIndex={dIndex}
                        setValue={setValue}
                        watch={watch}
                        register={register}
                    />
                ))}
            </div>
        </>
    );
};

export default Question;