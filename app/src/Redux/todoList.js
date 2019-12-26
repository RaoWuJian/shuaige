import {FETCH, DELETE, SEARCH, RESET, CREATE, SAVES, EDIT, CANCEL} from '../ActionTypes/tosoList'
const initState = {
    data: '',
};

export const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        //fetch数据
        case FETCH:
            //  
            return {
                ...state,
                data: action.payload,
            };
        //删除
        case DELETE:
            return {
                ...state,
                data:action.payload,
            };
        //搜索      
        case SEARCH:   
            return {
                ...state,
                data:action.payload,
            };
        //重置
        case RESET:
            return {
                ...state,
                data:action.payload,
            };
        //添加
        case CREATE: 
            return{
                ...state,
                data:action.payload,
            }
        //修改
        case SAVES:        
            return{
                ...state,
                data:action.payload,
            }
            

        case CANCEL: 
            return{
                ...state,
                editingKey:'',
            }
        default:
            return state;
    }
};
