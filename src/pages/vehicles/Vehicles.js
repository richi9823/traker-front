import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import PostList from './list/VehicleList';
import DetailVehicle from './detail/DetailVehicle';
import Routes from '../routes/Routes';

class Posts extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/vehicles" exact component={PostList} />
        <Route path="/app/vehicles/:id" exact component={DetailVehicle} />
        <Route path="/app/vehicles/:id/routes" component={Routes} />
      </Switch>
    );
  }
}

export default withRouter(Posts);
