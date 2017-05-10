import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Home from '../app/home/Home';

import { CityActions } from '../app/statemanagement/actions';
import { setBaseUrl } from '../app/statemanagement/AppStateManagement';

class Explore extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req } = params;
    console.log('Explore page render');
    // If not Server Side rendered, do not need to fetch everything again
    if (isServer) {
      const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
      await store.dispatch(setBaseUrl(baseUrl));
      await store.dispatch(CityActions.loadCities());
      // We may render from city/:cityName and select that city by default
      if(req && req.params.cityName) {
        await store.dispatch(CityActions.selectCity(req.params.cityName));
      }
    }
    return;
  }

  render() {
    return (
      <Layout>
        blabla
      </Layout>
    )
  }
}

export default withRedux(initStore)(Explore);
