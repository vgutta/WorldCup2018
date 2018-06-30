import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'react';
import * as GroupActions from './groupsActions';
import GroupCards from './GroupCards';

class Groups extends Component {
    componentWillUpdate() {
        this.props.fetchGroups();
    }

    render() {
        const { groups } = this.props;
        if (!groups.fetched) {
            return <div>Empty</div>;
        }
        return <GroupCards groups={groups.groups.groups}/>;
    }
}

function mapStateToProps(store) {
    return {groups: store.groups};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...GroupActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);