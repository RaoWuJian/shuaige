import {FETCH, DELETE,SEARCH, RESET, CREATE, SAVES, EDIT, CANCEL} from '../ActionTypes/tosoList'


export const createFetchAction = () => {
    
    return {
        type: FETCH,
        // eslint-disable-next-line no-undef
        payload: action.payload
    };
};
export const createDeleteAction = () => {
    return {
        type: DELETE,
        // eslint-disable-next-line no-undef
        payload: action.payload
    };
};
export const createSearchAction = ()  => {
    return {
        type: SEARCH,
        // eslint-disable-next-line no-undef
        payload: action.payload,
    };
};
export const createResetAction = ()  => {
    return {
        type: RESET,
        // eslint-disable-next-line no-undef
        payload: action.payload,
    };
};
export const createAction = ()  => {
    return {
        type: CREATE,
        // eslint-disable-next-line no-undef
        payload: action.payload,
    };
};
export const createSavesAction = ()  => {
    return {
        type: SAVES,
        // eslint-disable-next-line no-undef
        payload: action.payload,
    };
};
export const createEditAction = (id)  => {
    return {
        type: EDIT,
        payload: id,
    };
};
export const cancelAction = ()  => {
    return {
        type: CANCEL,
    };
};