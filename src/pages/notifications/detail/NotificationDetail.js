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
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Badge,
  ListGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import s from './NotificationDetail.module.scss';
import Widget from '../../../components/Widget/Widget';
import { getVehicle } from '../../../actions/vehicle';
import Maps from '../../google/Google';


class NotificationDetail extends Component {
  /* eslint-disable */
  static propTypes = {
    selected: PropTypes.any,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    vehicle: {},
    isFetching: false,
  };

  state = {
    isDropdownOpened: false
  };

  componentDidMount() {
    this.props.dispatch(getVehicle(this.props.match.params.id)).then((response)=>{
      console.log(response)
      this.setState({vehicle: response});
    })
  }

  Map = withScriptjs(withGoogleMap(() =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: parseFloat(-37.813179), lng: parseFloat(144.950259) }}
  >
    <Marker position={{ lat: -37.813179, lng: 144.950259 }} />
  </GoogleMap>,
));



  render() {
    const {vehicle} = this.state;

    return (
      <div className={s.root}>
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Vehiculos</BreadcrumbItem>
          <BreadcrumbItem active>{vehicle?.id}</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Detalle del vehiculo</h1>
        <Row>
          <Col sm={12} md={8}>
            <Widget
              title={
                <div>
                  <h5 className="mt-0 mb-3">
                    <i className="glyphicon glyphicon-map-marker mr-xs opacity-70" />{' '}
                    Mapa
                  </h5>
                </div>
              }
            >
              <div style={{minHeight: "550px"}}>
                  <Maps/>
              </div>
              
            </Widget>
          </Col>
          <Col md={4}>
          <Col sm={12} md={12}>
          <Widget
              title={
                <span>
                  <span className="fw-semi-bold">Formulario</span>
                </span>
              }
            >
              <Form onSubmit={this.doCreateVehicle}>
                {this.props.message && (
                  <Alert className="alert-sm" bsstyle="info">
                    {this.props.message}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-title">Modelo</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Modelo"
                    value={this.state.model}
                    required
                    onChange={this.changeModel}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-content">Matricula</Label>
                  <Input
                    id="input-content"
                    type="text"
                    placeholder="Matricula"
                    value={this.state.license}
                    required
                    onChange={this.changeLicense}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-content">Dispositivo ID</Label>
                  <Input
                    id="input-content"
                    type="text"
                    placeholder="ID"
                    value={this.state.device_register_id}
                    required
                    onChange={this.changeDeviceRegisterId}
                  />
                </FormGroup>
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                    <Button color="danger" type="submit">
                      {this.props.isFetching ? 'Registrando...' : 'Guardar cambios'}
                    </Button>
                  </ButtonGroup>
                </div>
              </Form>
            </Widget>
          </Col>
          <Col sm={12} md={12}>
            <ListGroup>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-phone mr-xs text-secondary" />{' '}
                Trayectorias <Badge className="ml-xs" color="danger">3</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-bell-o mr-xs text-secondary" />{' '}
                Notificaciones <Badge className="ml-xs" color="warning">6</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-comment-o mr-xs text-secondary" />{' '}
                Alertas <Badge className="ml-xs" color="success">18</Badge>
              </Link>
            </ListGroup>
          </Col>
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

export default connect(mapStateToProps)(NotificationDetail);
