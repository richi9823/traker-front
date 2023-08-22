import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import NotificationList from './list/NotificationList';
import NotificationDetail from './detail/NotificationDetail';

class Notifications extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/app/notifications" exact component={NotificationList} />
        <Route path="/app/notifications/:id" exact component={NotificationDetail} />
      </Switch>
    );
  }
}

export default withRouter(Notifications);
