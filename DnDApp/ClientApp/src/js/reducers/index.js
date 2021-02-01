const initialState = {
    selectedRace: {},
    selectedProfession: {}
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "SELECT_RACE": {
            return Object.assign({}, state, {
                selectedRace: action.payload
            })
        }
        case "SELECT_PROFESSION": {
            return Object.assign({}, state, {
                selectedProfession: action.payload
            })
        }
        default:
            return state      
    }
};

export default rootReducer;