import React from 'react';
import { connect} from 'react-redux';
import {bindActionCreators} from 'react';
import * as FixtureActions from './fixturesActions'
import FixturesList from 'FixturesList';

class Fixtures extends React.Component {
    componentWillMount(){
        this.props.fetchFixtures();
    }

    render() {
        const { fixtures } = this.props;
        if (!fixtures.fetched) {
            return <div>Empty</div>;
        }
        return <FixturesList fixtures={fixtures.fixtures} />;
    }

}

function mapStateToProps(store) {
    return {fixtures: store.fixtures};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...FixtureActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Fixtures);