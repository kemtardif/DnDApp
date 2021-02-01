import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './js/components/Layout';
import { Home } from './js/components/Home';
import CharacterCreation from './js/components/CharacterCreation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={ CharacterCreation } />
      </Layout>
    );
  }
}
