/* eslint-disable jsx-a11y/anchor-is-valid */
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
  Table,
} from 'reactstrap';
import s from './DetailVehicle.module.scss';
import Widget from '../../../components/Widget/Widget';
import { addGpsDevice, editVehicle, getVehicle } from '../../../actions/vehicle';
import Maps from '../../google/Google';
import { getAllAlerts } from '../../../actions/alert';
import { getAllNotifications } from '../../../actions/notification';
import { getAllRoute } from '../../../actions/route';
import { getPosition } from '../../../actions/position';
import moment from 'moment';
import { Toggle } from '../../../components/Toggle';
import { getStatus } from '../../../enum/GPSStatus';
import { deleteGps, updateStatusGps } from '../../../actions/gps';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddGPSModal from '../../../components/Modals/AddGPSModal';


class DetailVehicle extends Component {
  /* eslint-disable */
  static propTypes = {
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    errorMessageGPS: PropTypes.string.isRequired,
    isFetchingGPS: PropTypes.bool
  };
  /* eslint-enable */

  static defaultProps = {
    isFetching: false,
    message: null,
    errorMessage: null,
  };

  state = {
    vehicle: {},
    notifications:{},
    alerts:{},
    routes:{},
    position:{
      latitude:0,
      longitude:0
    },
    showError: false,
    showSuccess: false,
    online: false,
    showErrorGPS:false,
    showErrorGPSModal:false,
    modalGPS:false
  };

  handleChange = (event) => {
    const {
      target: {
        type, name, checked, value,
      },
    } = event;
    const newValue = type === 'checkbox' ? checked : value;

    this.setState((prevState) => ({
      vehicle: {
        ...prevState.vehicle,
        [name]: newValue,
      },
    }));
  };

  editVehicle = (e) => {
    const { vehicle } = this.state
    this.props
      .dispatch(
        editVehicle(this.props.match.params.id, vehicle),
      )
      .then((res) => {
        this.setState({
          vehicle: res,
          showError: false,
          showSuccess: true,
        });
      }
      ).catch(() =>{
        this.setState({showError:true ,showSuccess:false})
      })
    e.preventDefault();
  }

  componentDidMount() {
    this.props.dispatch(getVehicle(this.props.match.params.id)).then((response)=>{
      this.setState({vehicle: response});
      this.props.dispatch(getPosition(this.props.match.params.id)).then((re)=>{
        this.setState({position: re});
        if((moment(re.gps.last_updated).isBefore(moment().subtract(3,'minutes')))){
          setInterval(this.buclePositions,15000)
          this.setState({online:false})
        }else{
          setInterval(this.buclePositions,3000)
          this.setState({online:true})
        }
      }).catch((err) => {
        console.warn(err)
      })
      
    }).catch((err) => {
      this.setState({showError:true})
    })

    this.props.dispatch(getAllAlerts(this.props.match.params.id, null, null, null)).then((response)=>{
      this.setState({alerts: response});
    }).catch((err) => {
      this.setState({showError:true})
    })

    this.props.dispatch(getAllNotifications(this.props.match.params.id, null, false, null, null, null)).then((response)=>{
      this.setState({notifications: response});
    }).catch((err) => {
      this.setState({showError:true})
    })

    this.props.dispatch(getAllRoute(this.props.match.params.id, null, null, null, null)).then((response)=>{
      this.setState({routes: response});
    }).catch((err) => {
      this.setState({showError:true})
    })

    
  }

  buclePositions = () =>{
   this.props.dispatch(getPosition(this.props.match.params.id)).then((response)=>{
     this.setState({position: response});
   }).catch((err) => {
     console.warn(err)
   })
  }


onToggled = (value, id) => {
  this.props.dispatch(updateStatusGps(id, value ? 'ACTIVE' : 'INACTIVE')).then((res) =>{
    this.props.dispatch(getVehicle(this.props.match.params.id)).then((response)=>{
      this.setState({vehicle: response});
    }).catch((err) => {
      this.setState({showError:true})
    })
  });
}

deleteGps = (id) => {
  this.props.dispatch(deleteGps(id)).then(() =>{
    this.props.dispatch(getVehicle(this.props.match.params.id)).then((response)=>{
      this.setState({vehicle: response});
    }).catch((err) => {
      this.setState({showErrorGPS:true})
    })
  });
}

openModalGPS=()=>{
  this.setState({modalGPS:true})
}

addGPS=(value)=>{
  this.props.dispatch(addGpsDevice(this.props.match.params.id, value)).then(() =>{
    this.props.dispatch(getVehicle(this.props.match.params.id)).then((response)=>{
      this.setState({vehicle: response, showErrorGPSModal: false, modalGPS:false});
    }).catch((err) => {
      this.setState({showError:true})
    })
  }).catch((err) => {
    this.setState({showErrorGPSModal:true})
  });
}



  render() {
    const {vehicle, position, showError, showErrorGPS, showErrorGPSModal, showSuccess, notifications, routes, alerts, online, modalGPS} = this.state;
    console.log(position)
    return (
      <div className={s.root}>
        {modalGPS ? <AddGPSModal isFetching={this.props.isFetching} errorMessage={this.props.errorMessage} showErrorGPSModal={showErrorGPSModal} addGPS={this.addGPS} onCancel={()=> this.setState({modalGPS:false})} text={"Nuevo dispositivo"}/> : null}
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Vehiculos</BreadcrumbItem>
          <BreadcrumbItem active>{vehicle?.id}</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Detalle del vehiculo</h1>
          {this.props.errorMessage && showError &&(
                  <Alert className="alert-sm alert-danger" bsstyle="danger">
                    {this.props.errorMessage}
                  </Alert>
          )}
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
                   <Maps latitude={position.latitude} longitude={position.longitude}/>
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
              
              <Form onSubmit={this.editVehicle}>
              {this.props.message && showSuccess &&(
                  <Alert className="alert-sm" bsstyle="danger">
                    {this.props.message}
                  </Alert>
              )}
                <FormGroup>
                  <Label for="input-title">Modelo</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Modelo"
                    value={vehicle.model}
                    name="model"
                    required
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-content">Matricula</Label>
                  <Input
                    id="input-content"
                    type="text"
                    placeholder="Matricula"
                    name="license"
                    value={vehicle.license}
                    required
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-content">Descripcion</Label>
                  <Input
                    id="input-content"
                    type="textarea"
                    placeholder="Descripcion"
                    value={vehicle.description}
                    name="description"
                    required
                    onChange={this.handleChange}
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
                Trayectorias <Badge className="ml-xs" color="danger">{routes.total}</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-bell-o mr-xs text-secondary" />{' '}
                Notificaciones <Badge className="ml-xs" color="warning">{notifications.total}</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-comment-o mr-xs text-secondary" />{' '}
                Alertas <Badge className="ml-xs" color="success">{alerts.total}</Badge>
              </Link>
            </ListGroup>
          </Col>
          </Col>
        </Row>
        <Row>
        <Col sm={5}>
        <Widget
              title={
                <h5 className="mt-0 mb-2">
                    Detalles del vehiculo
                  </h5>
              }
            >
              <FormGroup>
              <Label className="mr-2">Estado:</Label>
                <span>
                    <span className="fw-semi-bold"> {online ? 'online' : 'offline'}</span>
                </span>
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Distancia total:</Label>
                <span>
                    <span className="fw-semi-bold">{ (vehicle.total_distance/100).toFixed(2)} Km</span>
                </span>
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Fecha registro:</Label>
                <span>
                    <span className="fw-semi-bold">{ moment(vehicle.created_date).format("DD-MM-YYYY")}</span>
                </span>
              </FormGroup>
            </Widget>
        </Col>
        <Col sm={7}>
        <Widget
              title={
                <div>
                  <h5 className="mt-0 mb-3">
                    <i className="fa fa-user mr-xs opacity-70" />{' '}
                    Dispositivos
                  </h5>
                </div>
              }
            >
              {this.props.errorMessageGPS && showErrorGPS && (
                  <Alert className="alert-sm" bsstyle="danger">
                    {this.props.errorMessageGPS}
                  </Alert>
                )}
                <div className="d-flex justify-content-end">
                  <ButtonGroup>
                <Button color="danger" type="submit" onClick={()=>this.openModalGPS()}>
                      {this.props.isFetchingGPS ? 'Cargando...' : 'Nuevo dispositivo'}
                    </Button>
                    </ButtonGroup>
                    </div>
              <Table responsive borderless className={cx('mb-0', s.usersTable)}>
                <thead>
                  <tr>
                    <th>Id dispositivo</th>
                    <th>Nombre</th>
                    <th>Activo</th>
                  </tr>
                </thead>
                <tbody>
                {vehicle?.gps &&
                vehicle?.gps.length > 0 &&
                vehicle?.gps.map(a => (
                 <tr key={a.id}>
                  <td>{a.register_device_id}</td>
                  <td>{a.name}</td>
                  <td>
                    <Toggle toggled={getStatus(a.status)} onClick={this.onToggled} id={a.id}/>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement='top'
                      overlay={<Tooltip>Delete</Tooltip>}
                    >
                        <a
                          className='btn btn-outline-danger btn-sm mx-1'
                          onClick={() => this.deleteGps(a.id)}
                        >
                  <span
                  className="glyphicon glyphicon-trash"
                  />
                      </a>
                    </OverlayTrigger>
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
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.vehicle.isFetching,
    message: state.vehicle.message,
    errorMessage: state.vehicle.errorMessage,
    errorMessageGPS: state.gps.errorMessage,
    isFetchingGPS: state.gps.isFetching
  };
}

export default connect(mapStateToProps)(DetailVehicle);
