import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import AlertList from './list/AlertList';
import AlertDetail from './detail/AlertDetail';

class Alerts extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/alerts" exact component={AlertList} />
        <Route path="/app/alerts/:id" exact component={AlertDetail} />
      </Switch>
    );
  }
}

export default withRouter(Alerts);
