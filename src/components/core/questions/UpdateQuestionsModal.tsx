import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { AppDispatch, RootState } from "../../../store/Store";
import { TQuestionPayload } from "../../../../types/questionTypes";
import Question from "./Question";
import { updateQuestionRequest } from "../../../store/reducers/QuestionReducers";

const UpdateQuestionsModal = (): JSX.Element => {
    const { singleQuestionData } = useSelector((state: RootState) => state.questionSlice);
    const dispatch: AppDispatch = useDispatch();

    const { register, control, handleSubmit, setValue, watch, reset } = useForm<TQuestionPayload>({
        defaultValues: {
            questionArray: [{ question: "", options: {}, derivedQuestions: [] }]
        }
    });

    // UseFieldArray hook to manage dynamic questions array
    const { fields: questions, append, remove } = useFieldArray({
        control,
        name: "questionArray"
    });

    // Prefill the form with existing questions when the data changes
    useEffect(() => {
        if (singleQuestionData?.questions) {
            reset({
                questionArray: singleQuestionData.questions.map((q: any) => ({
                    question: q.question || "",
                    options: q.options || {}, // Prepopulate options
                    derivedQuestions: q.derivedQuestions || [] // Prepopulate derivedQuestions
                }))
            });
        }
    }, [singleQuestionData, reset]);

    // Handle form submission for updating questions
    const handleFormSubmit = (data: TQuestionPayload) => {
        // Transform the form data to match the backend structure
        const transformedData = data.questionArray.map((question: any) => {
            // No need for subCategoryId here; just return the necessary fields
            const { _id, createdAt, updatedAt, ...restOfQuestion } = question;

            const transformedDerivedQuestions = restOfQuestion.derivedQuestions?.map((derivedQuestion: any) => {
                const { _id, derivedQuestions, ...restOfDerivedQuestion } = derivedQuestion;
                return {
                    ...restOfDerivedQuestion
                };
            });

            return {
                ...restOfQuestion,
                derivedQuestions: transformedDerivedQuestions
            };
        });
        console.log({
            data: transformedData[0],
            questionId: singleQuestionData?.questions?.[0]?._id,
            categoryId: singleQuestionData?._id,
        });

        // dispatch(updateQuestionRequest({
        //     data: transformedData[0], 
        //     questionId: singleQuestionData?.questions?.[0]?._id,
        //     categoryId: singleQuestionData?._id,
        // }));
    };

    return (
        <>
            <div className="modal fade" id="questionupdate-centermodal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myCenterModalLabel">Update Questions</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-3 py-2">
                                {/* Render all questions from the form state */}
                                {questions?.map((question, qIndex) => (
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

                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary btn-lg">Update Questions</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateQuestionsModal;