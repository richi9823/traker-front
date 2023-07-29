import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import PostList from './list/VehicleList';
import PostNew from './new/NewVehicle';

class Posts extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/vehicles" exact component={PostList} />
        <Route path="/app/vehicles/new" exact component={PostNew} />
      </Switch>
    );
  }
}

export default withRouter(Posts);
