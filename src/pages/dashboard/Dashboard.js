import React, {Component} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  Table,
} from 'reactstrap';
import { Toggle } from '../../components/Toggle';
import Widget from '../../components/Widget';

import { getAllVehicles } from '../../actions/vehicle';
import s from './Dashboard.module.scss';
import moment from 'moment/moment';
import RegisterVehicle from '../../components/RegisterVehicle/RegisterVehicle';
import { getAllAlerts } from '../../actions/alert';
import { getAllNotifications } from '../../actions/notification';

class Dashboard extends Component {
  /* eslint-disable */
  static propTypes = {
    posts: PropTypes.any,
    isFetchingVehicles: PropTypes.bool,
    isFetchingNotifications: PropTypes.bool,
    isFetchingAlerts: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    isFetchingVehicles: false,
    isFetchingNotifications: false,
    isFetchingAlerts: false,
    errorMessageVehicles: null,
    errorMessageNotification: null,
    errorMessageAlert: null,
  };

  state = {
    vehicles: {items:[], total: 0},
    alerts:{items:[], total: 0},
    notifications:{items:[], total: 0}
  };

  componentDidMount() {
      this.props.dispatch(getAllVehicles(1,5, null)).then((res) =>{
        this.setState({vehicles: res})
      });
      this.props.dispatch(getAllAlerts(null, 1,5, null)).then((res) =>{
        this.setState({alerts: res})
      });
      this.props.dispatch(getAllNotifications(null, null, false, 1,5, null)).then((res) =>{
        this.setState({notifications: res})
      });
  }

  render() {
    const {vehicles, alerts, notifications} = this.state
    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Dashboard</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Dashboard</h1>
        <Row>
          <Col sm={6}>
            <Widget
              title={
                <div>
                  <h5 className="mt-0 mb-0">
                    Vehiculos
                  </h5>
                  <p className="fs-sm mb-0 text-muted">
                    vehiculos con actualizaciones recientes
                  </p>
                </div>
              }
            >
              {this.props.errorMessageVehicles && (
                  <Alert className="alert-sm" bsstyle="danger">
                    {this.props.errorMessageVehicles}
                  </Alert>
                )}
              <table className="table table-sm table-no-border mb-0">
                <tbody>
                {vehicles?.items &&
                vehicles?.items.length > 0 &&
                vehicles?.items.map(v => (
                  <tr key={v.id}>
                    <td>{moment(v.modified_date).format('DD/MM/YYYY HH:mm')}</td>
                    <td>
                      <Link to={"/app/vehicles/" + v.id}>{v.model + " " + v.license}</Link>
                    </td>
                  </tr>
                ))}
                {this.props.isFetchingVehicles && (
                  <tr>
                    <td colSpan="100">Cargando...</td>
                  </tr>
                )}
                {vehicles?.total === 0 && !this.props.isFetchingVehicles && 
                  <tr>
                    <td colSpan="100">No hay registros...</td>
                  </tr> 
                  }
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <Link to="/app/vehicles" className="btn btn-default">
                 Ver todos <Badge className="ml-xs" color="danger">{vehicles?.total ? vehicles?.total: 0}</Badge>
                </Link>
              </div>
            </Widget>
          </Col>
          <Col sm={6}>
            <RegisterVehicle />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Widget
              title={
                <div>
                  <h5 className="mt-0 mb-3">
                    <i className="fa fa-user mr-xs opacity-70" />{' '}
                    Alertas recientes
                  </h5>
                </div>
              }
            >
              {this.props.errorMessageAlert && (
                  <Alert className="alert-sm" bsstyle="danger">
                    {this.props.errorMessageAlert}
                  </Alert>
                )}
              <Table responsive borderless className={cx('mb-0', s.usersTable)}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Silenciada</th>
                  </tr>
                </thead>
                <tbody>
                {alerts?.items &&
                alerts?.items.length > 0 &&
                alerts?.items.map(a => (
                 <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.type}</td>
                  <td>
                    <Toggle toggled={a.silenced} onClick={()=>{}}/>
                  </td>
                </tr>
                ))}
                {this.props.isFetchingAlerts && (
                  <tr>
                    <td colSpan="100">Cargando...</td>
                  </tr>
                )}
                {alerts?.total === 0 && !this.props.isFetchingAlerts && 
                  <tr>
                    <td colSpan="100">No hay registros...</td>
                  </tr> 
                  }
                </tbody>
              </Table>
            </Widget>
          </Col>
          <Col sm={12} md={6}>
            <Widget title="Notificaciones recientes">
            {this.props.errorMessageNotification && (
                  <Alert className="alert-sm" bsstyle="danger">
                    {this.props.errorMessageNotification}
                  </Alert>
                )}
                {notifications?.items &&
                notifications?.items.length > 0 &&
                notifications?.items.map(n => (
                  <Alert
                  className="alert-sm clearfix"
                  color="warning"
                  key={n.key}
                >
                  <span className="fw-semi-bold">
                    </span> 
                    El vehiculo {n.vehicle.model} - {n.vehicle.license} tiene una notificacion de tipo {n.alert.type}
                  <span className="pull-right mr-sm">
                    <Button color="default" size="sm">
                      Ver detalle
                    </Button>
                    <span className="px-2"> or </span>
                    <Button color="default" size="sm">Leido</Button>
                  </span>
                </Alert>
                ))}
                {this.props.isFetchingNotifications && (
                  <tr>
                    <td colSpan="100">Cargando...</td>
                  </tr>
                )}
                {notifications?.total === 0 && !this.props.isFetchingNotifications && 
                  <tr>
                    <td colSpan="100">No hay registros...</td>
                  </tr> 
                  }
            </Widget>
          </Col>
        </Row>
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetchingVehicles: state.vehicle.isFetching,
    isFetchingNotifications: state.notification.isFetching,
    isFetchingAlerts: state.alert.isFetching,
    errorMessageVehicles: state.vehicle.errorMessage,
    errorMessageNotification: state.notification.errorMessage,
    errorMessageAlert: state.alert.errorMessage,
  };
}

export default connect(mapStateToProps)(Dashboard);
