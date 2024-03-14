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
import { editAlert, getAllAlerts } from '../../actions/alert';
import { getAllNotifications } from '../../actions/notification';
import { getAlertType } from '../../enum/alertType';

class Dashboard extends Component {
  /* eslint-disable */
  static propTypes = {
    alertList: PropTypes.object.isRequired,
    notificationList: PropTypes.object.isRequired,
    vehicleList: PropTypes.object.isRequired,
    isFetchingVehicles: PropTypes.bool,
    isFetchingNotifications: PropTypes.bool,
    isFetchingAlerts: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    isFetchingVehicles: false,
    errorMessageVehicles: null,
    vehicleList: {items:[], total: 0},
    notificationList: {items:[], total: 0},
    alertList: {items:[], total: 0},
    isFetchingNotifications: false,
    isFetchingAlerts: false,
    errorMessageNotification: null,
    errorMessageAlert: null,
  };

  state = {
  };

  componentDidMount() {
      this.props.dispatch(getAllVehicles(1,5, null))
      this.props.dispatch(getAllAlerts(null, 0,5, null))
      this.props.dispatch(getAllNotifications(null, null, false, 1,5, null))
  }

  onRegister = () => {
    this.props.dispatch(getAllVehicles(1,5, null));
  }

  onToggled = (value, id) => {
    this.props.dispatch(editAlert(id, {silenced:value}));
  }

  render() {
    const {vehicleList, alertList, notificationList} = this.props;
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
              {this.props.errorMessageVehicles &&(
                  <Alert className="alert-sm" bsstyle="danger">
                    {this.props.errorMessageVehicles}
                  </Alert>
                )}
              <table className="table table-sm table-no-border mb-0">
                <tbody>
                {vehicleList?.items &&
                vehicleList?.items.length > 0 &&
                vehicleList?.items.map(v => (
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
                {vehicleList?.total === 0 && !this.props.isFetchingVehicles && 
                  <tr>
                    <td colSpan="100">No hay registros...</td>
                  </tr> 
                  }
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <Link to="/app/vehicles" className="btn btn-default">
                 Ver todos <Badge className="ml-xs" color="danger">{vehicleList?.total ? vehicleList?.total: 0}</Badge>
                </Link>
              </div>
            </Widget>
          </Col>
          <Col sm={6}>
            <RegisterVehicle onRegister={this.onRegister}/>
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
                {alertList?.items &&
                alertList?.items.length > 0 &&
                alertList?.items.map(a => (
                 <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{getAlertType(a.type)}</td>
                  <td>
                    <Toggle toggled={a.silenced} onClick={this.onToggled} id={a.id}/>
                  </td>
                </tr>
                ))}
                {this.props.isFetchingAlerts && (
                  <tr>
                    <td colSpan="100">Cargando...</td>
                  </tr>
                )}
                {alertList?.total === 0 && !this.props.isFetchingAlerts && 
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
                {notificationList?.items &&
                notificationList?.items.length > 0 &&
                notificationList?.items.map(n => (
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
                {notificationList?.total === 0 && !this.props.isFetchingNotifications && 
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
    vehicleList: state.vehicle.vehicleList,
    notificationList: state.notification.notificationList,
    alertList: state.alert.alertList,
    errorMessageVehicles: state.vehicle.errorMessage,
    errorMessageNotification: state.notification.errorMessage,
    errorMessageAlert: state.alert.errorMessage,
  };
}

export default connect(mapStateToProps)(Dashboard);
