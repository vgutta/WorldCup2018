import React, {Component} from 'react';
import {List, Avatar, Row, Col, Collapse} from 'antd';
import moment from 'moment';
import countries from './countries';

export default class FixtureList extends Component {
    render() {
        const fixtures = this.props.fixtures;
        const matches = [];
        const completedMatches = [];
        const liveMatches = [];
        fixtures.rounds.map(round => {
            round.matches.map(match => {
                match.team1.avatar = this.getAvatar(match.team1.name);
                match.team1.avatar = this.getAvatar(match.team2.name);
                match.sortTime = `${match.date}T${match.time}`;
                match.time = moment(
                    `${match.date}T${match.time}+0${match.timezone.substr(
                        match.timezone.indexOf("+") + 1
                    )}`
                )
                    .tz(moment.tz.guess())
                    .format("DD MMM YYYY hh:mmA z");
                match.isBefore = moment(match.sortTime).isBefore(moment());
                if (match.score1 !== null || (!match.isCurrent && match.isBefore)) {
                    completedMatches.push(match);
                } else if (mathc.isCurrent) {
                    liveMatches.push(match);
                } else matches.push(match);
            });
        });

        matches.sort((a, b) => new Date(a.sortTime) - new Date(b.sortTime));
        return (
            
        );
    }
}