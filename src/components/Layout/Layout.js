/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { Switch, Route, withRouter } from 'react-router';

import s from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard'
import Buttons from '../../pages/buttons'
import Charts from '../../pages/charts'
import Maps from '../../pages/google'
import NotFound from '../../pages/notFound'
import Icons from '../../pages/icons'
import Typography from '../../pages/typography'
import Tables from '../../pages/tables'
import Notifications_ from '../../pages/notifications_'
import Vehicles from '../../pages/vehicles/Vehicles'
import Profile from '../../pages/profile'
import Privacy from '../../pages/privacy'
import Alerts from '../../pages/alerts/Alerts';
import Notifications from '../../pages/notifications/Notifications';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <Sidebar />
        <div
          className={cx(s.wrap, {[s.sidebarOpen]: this.state.sidebarOpen})}
        >
          <Header
            sidebarToggle={() =>
              this.setState({
                sidebarOpen: !this.state.sidebarOpen,
              })
            }
          />
          <main className={s.content}>
            <Switch>
              <Route path="/app/main" exact component={Dashboard} />
              <Route path="/app/vehicles" component={Vehicles} />
              <Route path="/app/alerts" component={Alerts} />
              <Route path="/app/notifications" component={Notifications} />

              <Route path="/app/typography" exact component={Typography} />
              <Route path="/app/tables" exact component={Tables} />
              <Route path="/app/privacy" exact component={Privacy} />
              <Route path="/app/profile" exact component={Profile} />
              <Route path="/app/notifications" exact component={Notifications_} /> 
              <Route path="/app/components/buttons" exact component={Buttons} />
              <Route path="/app/components/charts" exact component={Charts} />
              <Route path="/app/components/icons" exact component={Icons} />
              <Route path="/app/components/maps" exact component={Maps} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(Layout);
