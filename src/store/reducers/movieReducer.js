
const DEFAULT_STATE = {
    currentPath: "/admin/movie-management",
    userInfor: '',
  };


export const movieReducer = (state=DEFAULT_STATE, action) => {
    const {type, payload} = action 
    switch (type) {
        case 'SET_CURRENT_PATH': {
            state.currentPath = payload
            break;
        }
        case 'SET_USER_INFOR': {
            state.userInfor = payload
            break
        }
        default:
            break;
    }

    return {...state}
}