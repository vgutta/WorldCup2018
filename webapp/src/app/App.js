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
              className={header}
            >
              
            </Header>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
