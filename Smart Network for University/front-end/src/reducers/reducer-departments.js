import {LOAD_USER_DEPARTMENTS} from '../actions/files';
import {LOAD_DEPARTMENTS} from '../actions/files';
import {LOAD_USERONLY_DEPARTMENTS} from '../actions/files';

const initialState = {
    departments:[],
};


const departments = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_USER_DEPARTMENTS :
            state = {
                departments: action.obj.departments,
            };
            console.log(state);
            return state;

        case LOAD_DEPARTMENTS :
            state = {
                departments: action.obj.result,
            };
            console.log(state);
            return state;

        case LOAD_USERONLY_DEPARTMENTS :
            state = {
                departments: action.obj.departments,
            };
            console.log(state);
            return state;

        default :
            return state;

    }
};

export default departments;