import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import RouteList from './list/RouteList';
import DetailRoute from './detail/DetailRoute';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/vehicles/:id/routes" exact component={RouteList} />
        <Route path="/app/vehicles/:id/routes/:routeId" exact component={DetailRoute} />
      </Switch>
    );
  }
}

export default withRouter(Routes);
