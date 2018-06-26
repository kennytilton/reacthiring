// src/js/reducers/index.js
import { combineReducers } from 'redux'

const initialState = {};

const rootReducer = combineReducers({
    app: appReducer
    , month: monthReducer
    , filter: filterReducer
    , jobs: jobsReducer
})

function appReducer( state = { helping: true}, action) {
    switch (action.type) {
        case "toggle-app-help":
            return {helping: !state.helping}
        default:
            return state
    }
}
function monthReducer( state = null, action) {
    switch (action.type) {
        default:
            return state
    }
}
function filterReducer( state = null, action) {
    switch (action.type) {
        default:
            return state
    }
}
function jobsReducer( state = null, action) {
    switch (action.type) {
        default:
            return state
    }
}

export default rootReducer;