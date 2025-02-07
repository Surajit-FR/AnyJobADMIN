type SliceState = {
    type: string;
};

const loadingActions = [
    'AuthLoginRequest',
    'AuthLogoutRequest',
    'addCategoryRequest',
    'getCategoryRequest',
    'getAllCategoryRequest',
    'updateCategoryRequest',
    'deleteCategoryRequest',
    'getAllQuestionRequest',
    'getQuestionRequest',
    'updateQuestionRequest',
    'getServiceRequest',
    'getAllServiceRequest',
    'getServiceTableDataRequest',
];

export const isLoading = (slice: SliceState, actions: string[]): boolean => {
    return actions.some(action => slice?.type.endsWith(action));
};

export const isAuthLoading = (auth: SliceState): boolean => {
    return isLoading(auth, loadingActions.filter(action => action.includes('Auth')));
};

export const isCategoryLoading = (category: SliceState): boolean => {
    return isLoading(category, loadingActions.filter(action => action.includes('Category')));
};

export const isQuestionLoading = (question: SliceState): boolean => {
    return isLoading(question, loadingActions.filter(action => action.includes('Question')));
};

export const isSubCategoryLoading = (subCategory: SliceState): boolean => {
    return isLoading(subCategory, loadingActions.filter(action => action.includes('SubCategory')));
};
export const isServiceLoading = (service: SliceState): boolean => {
    return isLoading(service, loadingActions.filter(action => action.includes('Service')));
};