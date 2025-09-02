import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { TQuestionPayload } from "../../../../types/questionTypes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDerivedQuestionRequest } from "../../../store/reducers/QuestionReducers";


type DerivedQuestionProps = {
    qIndex: number;
    dIndex: number;
    setValue: UseFormSetValue<TQuestionPayload>;
    watch: UseFormWatch<TQuestionPayload>;
    register: UseFormRegister<TQuestionPayload>;
    question?: any
    quesId?: string
    dq?: any
    catId?: string
}

const  DerivedQuestionComponent = ({ qIndex, dIndex, setValue, watch, register, question, quesId, dq, catId }: DerivedQuestionProps) => {
    const dispatch = useDispatch();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed); // Toggle collapse state for derived questions
    };

    const addDerivedOption = () => {
        const derivedOptionKey = String.fromCharCode(65 + Object.keys(watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`) || {}).length); // Auto-assign option key (A, B, C...)
        const derivedOptionLabel = prompt("Enter derived question option label:");
        if (derivedOptionLabel) {
            const derivedOptions = { ...watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`) };
            derivedOptions[derivedOptionKey] = derivedOptionLabel;
            setValue(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`, derivedOptions);
        }
    };

    const removeDerivedOption = (optionKey: string) => {
        const derivedOptions = { ...watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`) };
        delete derivedOptions[optionKey];
        setValue(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`, derivedOptions);
    };
    const onCliCkRemoveDerivedQuestion = (quesId: string, derivedquesId: string, catId: string) =>{
        console.log('catId',catId);
        
        dispatch(deleteDerivedQuestionRequest({data:{
            questionId: quesId,
            derivedQuestionId: derivedquesId
        },
        categoryId: catId
    }))
    }
    return (
        <>
            <div className="mt-4" style={{ marginLeft: "20px", padding: "10px", border: "1px solid #464f5b", borderRadius: "5px" }}>
                {/* Header for derived question with collapse button */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Derived Question for Option 
                        {watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.option`)}
                        </h5>
                                 <button
                                            // data-bs-toggle="modal" 
                                            // data-bs-target="#delete-question-alert-modal"
                                            className="btn btn-sm btn-soft-danger me-1"
                                            onClick={(e) =>{
                                                e.preventDefault()
                                                console.log({question})
                                                console.log({derivedQuestionId: question?.derivedQuestions[dIndex]?._id})
                                                quesId && console.log({quesId});
                                                dq && console.log({dq}); 
                                                console.log({dIndex});
                                                quesId && onCliCkRemoveDerivedQuestion(quesId,question?.derivedQuestions[dIndex]?._id,catId || '')    
    }
                                            }
                                            style={{marginLeft:"auto"}}
                                        >
                                            <i className="ri-delete-bin-line me-1"></i>
                                            Delete Derived Question
                                        </button>
                    <button type="button" className="btn btn-sm btn-secondary" onClick={toggleCollapse}>
                        {isCollapsed ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>}
                    </button>
                </div>

                {/* Collapsible content for derived question */}
                {!isCollapsed && (
                    <>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Derived Question"
                                {...register(`questionArray.${qIndex}.derivedQuestions.${dIndex}.question`)}
                                style={{ width: "50%", marginRight: "20px" }}
                            />
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-info me-2"
                                onClick={addDerivedOption}
                            >
                                Add Derived Option
                            </button>
                        </div>

                        {Object.entries(watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options`) || {}).map(([optionKey]) => (
                            <div className="mt-2" key={optionKey}>
                                <span>{optionKey}: {watch(`questionArray.${qIndex}.derivedQuestions.${dIndex}.options.${optionKey}`)}</span>
                                <button type="button" className="btn btn-sm btn-outline-danger mx-2" onClick={() => removeDerivedOption(optionKey)}>
                                    <i className="ri-delete-bin-5-fill"></i>
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default DerivedQuestionComponent;