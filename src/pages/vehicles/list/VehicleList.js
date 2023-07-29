import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Table,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';

import s from './VehicleList.module.scss';
import Widget from '../../../components/Widget/Widget';
import { fetchVehicles } from '../../../actions/vehicle';

class PostList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    vehicles: PropTypes.array, // eslint-disable-line
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    isFetching: false,
    vehicles: [],
  };

  static meta = {
    title: 'Lista de vehiculos',
    description: 'Aqui puede gestionar sus vehiculos',
  };

  componentDidMount() {
      this.props.dispatch(fetchVehicles());      
  }

  render() {
    return (
      <div className={s.root}>
        <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem active>Vehiculos</BreadcrumbItem>
        </Breadcrumb>
        <h1>Vehiculos</h1>
        <Widget
          className="pb-0"
          title={
            <div>
              <div className="pull-right mt-n-xs">
                <Link to="/app/vehicles/new" className="btn btn-sm btn-inverse">
                  Resgistrar nuevo vehiculo
                </Link>
              </div>
              <h5 className="mt-0">
                 <span className="fw-semi-bold">Vehiculos</span>
              </h5>
            </div>
          }
        >
          <div className="widget-table-overflow">
            <Table striped>
              <thead>
              <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Matricula</th>
              </tr>
              </thead>
              <tbody>
              {this.props.vehicles &&
              this.props.vehicles.map(v => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.model}</td>
                  <td>{v.license}</td>
                </tr>
              ))}
              {this.props.isFetching && (
                <tr>
                  <td colSpan="100">Cargando...</td>
                </tr>
              )}
              </tbody>
            </Table>
          </div>
        </Widget>
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

export default connect(mapStateToProps)(PostList);
