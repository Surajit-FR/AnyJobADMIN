type SliceState = {
    type: string;
};

const loadingActions = [
    'AuthLoginRequest',
    'AuthLogoutRequest',
    'addCategoryRequest',
    'getCategoryRequest',
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