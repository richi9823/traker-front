import React from 'react';
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
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Toggle } from '../../components/Toggle';
import Widget from '../../components/Widget/Widget';
import s from './Dashboard.module.scss';
import moment from 'moment/moment';
import RegisterVehicle from '../../components/RegisterVehicle/RegisterVehicle';
import { getAlertType } from '../../enum/alertType';

export default function DashboardView(props) {
    
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
                {props.errorMessageVehicles && props.showVehicleError &&(
                    <Alert className="alert-sm" bsstyle="danger">
                      {props.errorMessageVehicles}
                    </Alert>
                  )}
                <table className="table table-sm table-no-border mb-0">
                  <tbody>
                  {props.vehicles?.items &&
                  props.vehicles?.items.length > 0 &&
                  props.vehicles?.items.map(v => (
                    <tr key={v.id}>
                      <td>{moment(v.modified_date).format('DD/MM/YYYY HH:mm')}</td>
                      <td>
                        <Link to={"/app/vehicles/" + v.id}>{v.model + " " + v.license}</Link>
                      </td>
                    </tr>
                  ))}
                  {props.isFetchingVehicles && (
                    <tr>
                      <td colSpan="100">Cargando...</td>
                    </tr>
                  )}
                  {props.vehicles?.total === 0 && !props.isFetchingVehicles && 
                    <tr>
                      <td colSpan="100">No hay registros...</td>
                    </tr> 
                    }
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <Link to="/app/vehicles" className="btn btn-default">
                   Ver todos <Badge className="ml-xs" color="danger">{props.vehicles?.total ? props.vehicles?.total: 0}</Badge>
                  </Link>
                </div>
              </Widget>
            </Col>
            <Col sm={6}>
              <RegisterVehicle onRegister={props.onRegister}/>
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
                {props.errorMessageAlert && (
                    <Alert className="alert-sm" bsstyle="danger">
                      {props.errorMessageAlert}
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
                  {props.alerts?.items &&
                  props.alerts?.items.length > 0 &&
                  props.alerts?.items.map(a => (
                   <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{getAlertType(a.type)}</td>
                    <td>
                      <Toggle toggled={a.silenced} onClick={props.onToggled} id={a.id}/>
                    </td>
                  </tr>
                  ))}
                  {props.isFetchingAlerts && (
                    <tr>
                      <td colSpan="100">Cargando...</td>
                    </tr>
                  )}
                  {props.alerts?.total === 0 && !props.isFetchingAlerts && 
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
              {props.errorMessageNotification && (
                    <Alert className="alert-sm" bsstyle="danger">
                      {props.errorMessageNotification}
                    </Alert>
                  )}
                  {props.notifications?.items &&
                  props.notifications?.items.length > 0 &&
                  props.notifications?.items.map(n => (
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
                  {props.isFetchingNotifications && (
                    <tr>
                      <td colSpan="100">Cargando...</td>
                    </tr>
                  )}
                  {props.notifications?.total === 0 && !props.isFetchingNotifications && 
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