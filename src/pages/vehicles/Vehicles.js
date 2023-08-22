import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import PostList from './list/VehicleList';
import DetailVehicle from './detail/DetailVehicle';

class Posts extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/vehicles" exact component={PostList} />
        <Route path="/app/vehicles/:id" exact component={DetailVehicle} />
      </Switch>
    );
  }
}

export default withRouter(Posts);
