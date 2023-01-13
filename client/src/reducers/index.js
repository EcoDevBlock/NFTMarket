const initialState = {
    userId: '',
    isLoading: false,
    assets: [],
    accountDetails: {},
};

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER_ID':
            return { ...state, userId: action.payload }
        case 'SHOW_LOADER':
            return { ...state, isLoading: true }
        case 'HIDE_LOADER':
            return { ...state, isLoading: false }
        case 'FETCH_ASSETS':
            return { ...state, assets: [...action.payload] }
        case 'FETCH_ACCOUNT_DETAILS':
            return { ...state, accountDetails: {...action.payload} }
        default:
            return state;
    }

}

export default CommonReducer;