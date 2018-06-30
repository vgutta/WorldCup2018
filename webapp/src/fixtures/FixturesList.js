import React, {Component} from 'react';
import {List, Avatar, Row, Col, Collapse} from 'antd';
import moment from 'moment-timezone';
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
                match.team2.avatar = this.getAvatar(match.team2.name);
                match.sortTime = `${match.date}T${match.time}`;
                match.time = moment(
                    `${match.date}T${match.time}+0${match.timezone.substr(
                        match.timezone.indexOf("+") + 1
                    )}`
                )
                    .tz(moment.tz.guess())
                    .format("DD MMM YYYY hh:mmA z");
                match.isCurrent = moment(match.sortTime).isBetween(
                    moment(),
                    moment().subtract({ hours: "02" })
                );
                match.isBefore = moment(match.sortTime).isBefore(moment());
                if (match.score1 !== null || (!match.isCurrent && match.isBefore)) {
                    completedMatches.push(match);
                } else if (match.isCurrent) {
                    liveMatches.push(match);
                } else matches.push(match);
            });
        });

        matches.sort((a, b) => new Date(a.sortTime) - new Date(b.sortTime));
        return (
            <Collapse bordered={false} defaultActiveKey={["2"]}>
                <Collapse.Panel header="Results">
                    <List 
                        itemLayout="horizontal"
                        dataSource={completedMatches}
                        renderTime={item => this.renderListItem(item)}
                    />
                </Collapse.Panel>
                {liveMatches.length !== 0 && (
                    <Collapse.Panel header="Fixtures" key="2">
                        <List 
                            itemLayout="horizontal"
                            dataSource={liveMatches}
                            renderItem={item => this.renderListItem(item)}
                        />
                    </Collapse.Panel>
                )}
                <Collapse.Panel header="Fixtures" key="2">
                    <List 
                        itemLayout="horizontal"
                        dataSource={matches}
                        renderItem={item => this.renderListItem(item)}
                    />
                </Collapse.Panel>
            </Collapse>
        );
    }

    getAvatar(teamName) {
        if (teamName === "Russia") teamName = "Russian Federation";
        else if (teamName === "Iran") teamName = "Iran, Islamic Republic of";
        const countryCode = Object.keys(countries).find(
            key => countries[key] === teamName
        );
        if (countryCode)
            return `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${countryCode.toLowerCase()}.png`;
        return "";
    }

    renderListItem(item) {
        return (
            <List.Item>
                <List.Item.Meta 
                    title={
                        <Row>
                            <Col xs={2} lg={2}>
                                <Avatar src={item.team1.avatar} />
                            </Col>
                            <Col xs={24} lg={4} style={{ textAlign: "center"}}>
                                <h3>{item.team1.name}</h3>
                            </Col>
                            {item.score1 !== null && (
                                <Col xs={24} lg={4} style={{ textAlign: "center"}}>
                                    <h3>{item.score1}</h3>
                                </Col>
                            )}
                            {item.score1 !== null && (
                                <Col xs={24} lg={8} style={{ textAlign: "center"}}>
                                    vs
                                </Col>
                            )}
                            {item.score2 !== null && (
                                <Col xs={24} lg={4} style={{ textAlign: "center"}}>
                                    <h3>{item.score2}</h3>
                                </Col>
                            )}
                            <Col xs={24} lg={4} style={{ textAlign: "center"}}>
                                <h3>{item.team2.name}</h3>
                            </Col>
                            <Col xs={2} lg={2}>
                                <Avatar src={item.team2.avatar} />
                            </Col>  
                        </Row>
                    }
                    description = {
                        item.score1 === null ? (
                            <span>
                                At {item.stadium.name}, your time{" "}
                                <b>
                                    <i>{item.time}</i>
                                </b>
                            </span>
                        ) : (
                            <Row>
                                <Col xs={24} ls={8}>
                                    <div>{`Match Date: ${item.date}`}</div>
                                    <div>
                                        Scorers: {" "}
                                        {item.goals1.map(goal => (
                                            <b>
                                                <i>
                                                    {goal.name}:{goal.minute}{" "}
                                                </i>
                                            </b>
                                        ))}
                                    </div>
                                </Col>
                                <Col xs={24} lg={{ span: 8, offset: 8 }}>
                                        {item.goals2.map(goal => (
                                            <b>
                                                <i>
                                                    {goal.name}:{goal.minute}{" "}
                                                </i>
                                            </b>
                                        ))}
                                </Col>
                            </Row>
                        )
                    }
                />
            </List.Item>
        );
    }
}