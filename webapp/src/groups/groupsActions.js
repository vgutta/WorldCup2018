import axios from 'axios';

export function fetchGroups() {
    return (dispatch) => {
        dispatch({type: "FETCH_GROUPS"});
        axios.get("https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.standings.json", {})
            .then(response => {
                dispatch({type: "FETCH_GROUPS_FULLFILLED", payload: response.data});
            })
            .catch(error => {
                dispatch({type: "FETCH_GROUPS_REJECTED", payload: response.error});
            });
    };  
}