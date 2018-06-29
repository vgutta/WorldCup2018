export default function reducer(action) {
    state = {
        fixtures: {},
        fetching: false,
        fetch: false,
        error: null
    }

    switch(action.type) {
        case "FETCH_FIXTURES": {
            return {...state, fetching: true};
        }
        case "FETCH_FIXTURES_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_FIXTURES_FULLFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                fixtures: action.payload
            };
        }
    }

    return state;
}
