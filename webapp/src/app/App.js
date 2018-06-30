import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon, Row, Col } from "antd";
import { Provider } from "react-redux";
import store from '../store';
import './App.css';
import Fixtures from '../fixtures/Fixtures';
import Groups from '../groups/Groups';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Header 
              style={{ background: "#001529", padding: 0, paddingLeft: 16}}
              className="header"
            >
              <Row className="logo">
                <Col lg={8} xs={16}>
                  <h3>FIFA World Cup 2018 Fixtures and Results</h3>
                </Col>
                <Col lg={{span: 8, offset: 8}} xs={8}>
                  <h3>
                    <a href="https://github.com/chandrn/wc2018" target="_blank">
                      <Icon type="github" />
                    </a>
                  </h3>
                </Col>
              </Row>
            </Header>
            <Layout>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
              >
                <Menu>
                  
                </Menu>
              </Sider>
            </Layout>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
