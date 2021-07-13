const defaultState = {
    success: false,
    message: ''
}

const registryReduser = (state = defaultState, action) => {
    switch (action.type) {
        case "REG_USER":
            return {
                success: true,
                message: { ...action.payload }
            }
        case "REG_USER_FAIL":
            return{
                success: false,
                message: {...action.payload}
            }
        default: return state
    }
}


export default registryReduser