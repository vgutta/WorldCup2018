import axios from 'axios';

export function fetchFixtures() {
    return (dispatch) => {
        dispatch({type: 'FETCH_FIXTURES'});
        axios.get("https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json",{})
            .then(response => {
                dispatch({type: "FETCH_FIXTURES_FULLFILLED", payload: response.data});
            })
            .catch(err => {
                dispatch({type: "FETCH_FIXTURES_REJECTED", payload: response.err});
            });
    };
}