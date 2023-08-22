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

import { fetchVehicles } from '../../actions/vehicle';
import s from './Dashboard.module.scss';
import moment from 'moment/moment';
import NewVehicle from '../../components/new/NewVehicle';

class Dashboard extends Component {
  /* eslint-disable */
  static propTypes = {
    posts: PropTypes.any,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    posts: [],
    isFetching: false,
  };

  state = {
    isDropdownOpened: false
  };

  componentDidMount() {
      this.props.dispatch(fetchVehicles(1,5));
  }

  formatDate = (str) => {
    return str.replace(/,.*$/,"");
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      isDropdownOpened: !prevState.isDropdownOpened,
    }));
  }

  render() {
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
              <table className="table table-sm table-no-border mb-0">
                <tbody>
                {this.props.vehicles?.items &&
                this.props.vehicles?.items.map(v => (
                  <tr key={v.id}>
                    <td>{moment(v.modified_date).format('DD/MM/YYYY HH:mm')}</td>
                    <td>
                      <Link to={"/app/vehicles/" + v.id}>{v.model + " " + v.license}</Link>
                    </td>
                  </tr>
                ))}
                {this.props.isFetching && (
                  <tr>
                    <td colSpan="100">Cargando...</td>
                  </tr>
                )}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <Link to="/app/vehicles" className="btn btn-default">
                 Ver todos <Badge className="ml-xs" color="danger">{this.props.vehicles?.total ? this.props.vehicles?.total: 0}</Badge>
                </Link>
              </div>
            </Widget>
          </Col>
          <Col sm={6}>
            <NewVehicle />
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
              <Table responsive borderless className={cx('mb-0', s.usersTable)}>
                <thead>
                  <tr>
                    <th>Coche</th>
                    <th>Tipo</th>
                    <th>Limite</th>
                    <th>Silenciada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>6178LDJ</td>
                    <td>Velocidad</td>
                    <td>120km/h</td>
                    <td>
                      <Toggle checked onClick={()=>{}}/>
                    </td>
                  </tr>
                  <tr>
                    <td>6178LDJ</td>
                    <td>Velocidad</td>
                    <td>120km/h</td>
                    <td>
                    <Toggle checked onClick={()=>{}}/>
                    </td>
                  </tr>
                  <tr>
                    <td>6178LDJ</td>
                    <td>Velocidad</td>
                    <td>120km/h</td>
                    <td>
                    <Toggle checked onClick={()=>{}}/>
                    </td>
                  </tr>
                  <tr>
                    <td>6178LDJ</td>
                    <td>Velocidad</td>
                    <td>120km/h</td>
                    <td>
                    <Toggle checked onClick={()=>{}}/>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
          <Col sm={12} md={6}>
            <Widget title="Notificaiones recientes">
            <Alert
                className="alert-sm clearfix"
                color="danger"
              >
                <span className="fw-semi-bold">Danger:</span> Change this and
                that and try again.
                <span className="pull-right mr-sm">
                  <Button color="danger" size="sm">
                    Take this action
                  </Button>
                  <span className="px-2"> or </span>
                  <Button color="default" size="sm">Cancel</Button>
                </span>
              </Alert>
              <Alert
                className="alert-sm clearfix"
                color="danger"
              >
                <span className="fw-semi-bold">Danger:</span> Change this and
                that and try again.
                <span className="pull-right mr-sm">
                  <Button color="danger" size="sm">
                    Take this action
                  </Button>
                  <span className="px-2"> or </span>
                  <Button color="default" size="sm">Cancel</Button>
                </span>
              </Alert>
              <Alert
                className="alert-sm clearfix"
                color="danger"
              >
                <span className="fw-semi-bold">Danger:</span> Change this and
                that and try again.
                <span className="pull-right mr-sm">
                  <Button color="danger" size="sm">
                    Take this action
                  </Button>
                  <span className="px-2"> or </span>
                  <Button color="default" size="sm">Cancel</Button>
                </span>
              </Alert>
            </Widget>
          </Col>
        </Row>
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.vehicle.isFetching,
    vehicles: state.vehicle.vehicles,
  };
}

export default connect(mapStateToProps)(Dashboard);
