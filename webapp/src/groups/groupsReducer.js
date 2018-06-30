export default function reducer(action) {
    state = {
        groups: {},
        fetching: false,
        fetched: false,
        error: null
    }

    switch(action.type) {
        case "FETCH_GROUPS": {
            return {...state, fetching: true};
        }
        case "FETCH_GROUPS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_GROUPS_FULLFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                groups: action.payload
            };
        }
    }
    return state;
}