import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

import Icon from '../Icon';
import LinksGroup from './LinksGroup/LinksGroup';

import s from './Sidebar.module.scss';

const Sidebar = () => (
  <nav className={s.root}>
    <header className={s.logo}>
      <Link to="/app/main">
        <Icon glyph="logo" />
      </Link>
    </header>
    <ul className={s.nav}>
      <LinksGroup
        header="Home"
        headerLink="/app/main"
        glyph="dashboard"
      />
      <LinksGroup
        header="Vehiculos"
        headerLink="/app/vehicles"
        glyph="car"
      />
      <LinksGroup
        header="Alertas"
        headerLink="/app/alerts"
        glyph="alert"
      />
      <LinksGroup
        header="Notificaciones"
        headerLink="/app/notifications"
        glyph="notifications"
      />
      <LinksGroup
        header="Perfil"
        headerLink="/app/user"
        glyph="user"
      />
      <LinksGroup
        header="Components"
        headerLink="/app/components"
        childrenLinks={[
          {
            name: 'Buttons',
            link: '/app/components/buttons',
          },
          {
            name: 'Charts',
            link: '/app/components/charts',
          },
          {
            name: 'Icons',
            link: '/app/components/icons',
          },
          {
            name: 'Maps',
            link: '/app/components/maps',
          },
        ]}
        glyph="components"
      />
    </ul>
  </nav>
);

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
