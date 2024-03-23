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
  Badge,
  ListGroup,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from 'reactstrap';
import s from './DetailVehicle.module.scss';
import Widget from '../../../components/Widget/Widget';
import { addGpsDevice, addImage, cleanErrorVehicle, editVehicle, editVehicleRecord, getVehicle } from '../../../actions/vehicle';
import Maps from '../../google/Google';
import { getAllAlerts } from '../../../actions/alert';
import { getAllNotifications } from '../../../actions/notification';
import { getAllRoute } from '../../../actions/route';
import { getPosition } from '../../../actions/position';
import moment from 'moment';
import { Toggle } from '../../../components/Toggle';
import { getStatus } from '../../../enum/GPSStatus';
import { cleanErrorGpsAction, closeModalGPS, deleteGps, openModalGPS, updateStatusGps } from '../../../actions/gps';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddGPSModal from '../../../components/Modals/AddGPSModal';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { closeDeleteModal, openDeleteModal } from '../../../actions/navigation';
import pic from '../../../images/Pictures1.svg';
import { getFileURL } from '../../../util';


class DetailVehicle extends Component {
  /* eslint-disable */
  static propTypes = {
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    errorMessageGPS: PropTypes.string.isRequired,
    isFetchingGPS: PropTypes.bool,
    vehicle: PropTypes.object.isRequired,
    position: PropTypes.object.isRequired,
    alertList: PropTypes.object.isRequired,
    routeList: PropTypes.object.isRequired,
    notificationList: PropTypes.object.isRequired,
    modalGpsOpened: PropTypes.bool.isRequired,
    deleteModalOpened: PropTypes.bool.isRequired,
  };
  /* eslint-enable */

  static defaultProps = {
    deleteModalOpened: false,
    modalGpsOpened:false,
    isFetching: false,
    message: null,
    errorMessage: null,
    vehicle:{},
    position:{
      latitude:0,
      longitude:0
    },
    alertList:{items:[], total:0},
    notificationList:{items:[], total:0},
    routeList:{items:[], total:0}
  };

  state = {
    file: null,
    image: null,
    showSuccess: false,
    online: false,
    interval: null,
    deleteItem: null,
  };

  handleChange = (event) => {
    const {
      target: {
        type, name, checked, value,
      },
    } = event;
    const newValue = type === 'checkbox' ? checked : value;
    this.props.dispatch(editVehicleRecord(name, newValue))
  };

  editVehicle = (e) => {
    const { vehicle } = this.props
    const { file } = this.state;
    if(file){
      this.props.dispatch(addImage(this.props.match.params.id, file)).then(() =>{
        this.methodEdit(vehicle)
      })
    } else{
      this.methodEdit(vehicle)

    } 
    e.preventDefault();
  }

  methodEdit = (vehicle) =>{
    this.props
      .dispatch(
        editVehicle(this.props.match.params.id, vehicle),
      )
      .then(() => {
        this.props.dispatch(cleanErrorVehicle())
        this.setState({
          showSuccess: true,
        });
      }
      ).catch(() =>{
        this.setState({showSuccess:false})
      })
  }

  componentDidMount() {
    this.props.dispatch(getVehicle(this.props.match.params.id)).then(()=>{
      this.props.dispatch(getPosition(this.props.match.params.id)).then(()=>{
        const { position} = this.props;
        if((moment(position.gps.last_updated).isBefore(moment().subtract(3,'minutes')))){
          this.setState({online:false, interval:setInterval(this.buclePositions,15000) })
        }else{
          this.setState({online:true, interval: setInterval(this.buclePositions,3000)})
        }
      }).catch((err) => {
        console.warn(err)
      })  
    }).catch((err) => {
      console.error(err)
    })

    this.props.dispatch(getAllAlerts(this.props.match.params.id, null, null, null))
    this.props.dispatch(getAllNotifications(this.props.match.params.id, null, false, null, null, null))
    this.props.dispatch(getAllRoute(this.props.match.params.id, 1, null, null, null))

    
  }

  buclePositions = () =>{
   this.props.dispatch(getPosition(this.props.match.params.id))
  }

onToggled = (value, id) => {
  this.props.dispatch(updateStatusGps(id, value ? 'ACTIVE' : 'INACTIVE')).then(() =>{
    this.props.dispatch(getVehicle(this.props.match.params.id))
  });
}

openModalDeleteGPS = (data) => {
  this.props.dispatch(openDeleteModal())
  this.setState({deleteItem:data})
  
}

doRemoveGPS = () =>{
  const {deleteItem} = this.state;
  this.props.dispatch(deleteGps(deleteItem.id)).then(() =>{
    this.props.dispatch(getVehicle(this.props.match.params.id)).then(()=>{
      this.props.dispatch(closeDeleteModal())
    })
  });
}

openModalGPS=()=>{
  this.props.dispatch(openModalGPS())
}

addGPS=(value)=>{
  this.props.dispatch(addGpsDevice(this.props.match.params.id, value)).then(() =>{
    this.props.dispatch(getVehicle(this.props.match.params.id)).then(()=>{
      this.props.dispatch(closeModalGPS())
      this.props.dispatch(cleanErrorGpsAction())
    }).catch((err) => {
      console.error(err)
    })
  }).catch((err) => {
    console.error(err)
  });
}

removeTimeout = () =>{
  const { interval} = this.state
  clearInterval(interval)
}

handleAvatarChange = (event) => {
  const { target } = event;
  if (target.files.length) {
    this.setState((prevState) => ({
      image: URL.createObjectURL(target.files[0]),
      file: target.files[0],
    }));
  }
};


  render() {
    const {vehicle, position, notificationList, alertList, routeList, modalGpsOpened, deleteModalOpened} = this.props
    const {showSuccess, online, deleteItem, image} = this.state;
    return (
      <div className={s.root}>
        {modalGpsOpened ? <AddGPSModal addGPS={this.addGPS} text={"Nuevo dispositivo"}/> : null}
        {deleteModalOpened ? <DeleteModal isFetching={this.props.isFetching} onAccept={() => this.doRemoveGPS()} text={deleteItem.id}/> : null}
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Vehiculos</BreadcrumbItem>
          <BreadcrumbItem active>{vehicle?.id}</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Detalle del vehiculo</h1>
          {this.props.errorMessage &&(
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
                   <Maps ubication={{latitude: position.latitude, longitude:position.longitude}}/>
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
                <FormGroup className={s.divImage}>
                
                   {(vehicle.image || image) ? (
                     <img 
                       src={image ? getFileURL(image) : getFileURL(vehicle.image)}
                       alt='IMG'
                     />
                   ):(<img 
                    src={pic}
                    alt='IMG'
                  />)}
                  <div>
                  <label
                        className='btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow'
                        data-action='change'
                        data-toggle='tooltip'
                        title=''
                        data-original-title='Change'
                      >
                        <i className='fa fa-pencil-square-o' />
                     <input
                       type='file'
                       name='image'
                       accept='.png, .jpg, .jpeg, .svg'
                       onChange={this.handleAvatarChange}
                     />
                     </label>
                  </div>

                </FormGroup>
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
          </Col>
        </Row>
        <Row>
        <Col sm={8}>
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
              {this.props.errorMessageGPS && (
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
                          onClick={() => this.openModalDeleteGPS(a)}
                        >
                  <span
                  className="glyphicon glyphicon-trash"
                  />
                      </a>
                    </OverlayTrigger>
                  </td>
                </tr>
                ))}
                {this.props.isFetching && (
                  <tr>
                    <td colSpan="100">Cargando...</td>
                  </tr>
                )}
                {vehicle?.gps?.length === 0 && !this.props.isFetching && 
                  <tr>
                    <td colSpan="100">No hay registros...</td>
                  </tr> 
                  }
                </tbody>
              </Table>
            </Widget>
        <Widget
              title={
                <h5 className="mt-0 mb-2">
                    Detalles del vehiculo
                  </h5>
              }
            >
              <FormGroup>
              <Label className="mr-2">Estado:</Label>
                <Input
                    id="input-title"
                    type="text"
                    disabled
                    value={online ? 'online' : 'offline'}
                  />
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Distancia total:</Label>
                <Input
                    id="input-title"
                    type="text"
                    value={ (vehicle.total_distance/1000).toFixed(2) + "Km"}
                    disabled
                  />
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Fecha registro:</Label>
                <Input
                    id="input-title"
                    type="text"
                    value={ moment(vehicle.created_date).format("DD-MM-YYYY")}
                    disabled
                  />
              </FormGroup>
            </Widget>
        </Col>
        <Col sm={4} md={4}>
          <Widget>
            <ListGroup>
              <Link onClick={()=> this.removeTimeout()} to={"/app/vehicles/" + vehicle.id + "/routes"} className="list-group-item">
                <i className="fa fa-phone mr-xs text-secondary" />{' '}
                Trayectorias <Badge className="ml-xs" color="danger">{routeList.total}</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-bell-o mr-xs text-secondary" />{' '}
                Notificaciones <Badge className="ml-xs" color="warning">{notificationList.total}</Badge>
              </Link>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-comment-o mr-xs text-secondary" />{' '}
                Alertas <Badge className="ml-xs" color="success">{alertList.total}</Badge>
              </Link>
            </ListGroup>
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
    vehicle: state.vehicle.vehicle,
    message: state.vehicle.message,
    errorMessage: state.vehicle.errorMessage,
    errorMessageGPS: state.gps.errorMessage,
    isFetchingGPS: state.gps.isFetching,
    notificationList: state.notification.notificationList,
    routeList: state.route.routeList,
    alertList: state.alert.alertList,
    position: state.position.position,
    modalGpsOpened: state.gps.modalGpsOpened,
    deleteModalOpened: state.navigation.deleteModalOpened,
  };
}

export default connect(mapStateToProps)(DetailVehicle);
