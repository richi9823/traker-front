/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  Label,
  Input,
  ListGroup,
  Badge,
  ButtonGroup,
  Button,
} from 'reactstrap';
import s from './DetailRoute.module.scss';
import Widget from '../../../components/Widget/Widget';
import Maps from '../../google/Google';
import moment from 'moment';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { deleteRoute, getRoute } from '../../../actions/route';
import { getVehicle } from '../../../actions/vehicle';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { closeDeleteModal, openDeleteModal } from '../../../actions/navigation';


class DetailRoute extends Component {
  /* eslint-disable */
  static propTypes = {
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    route: PropTypes.object.isRequired,
    vehicle: PropTypes.object.isRequired,
    notificationList: PropTypes.object.isRequired
  };
  /* eslint-enable */

  static defaultProps = {
    isFetching: false,
    message: null,
    errorMessage: null,
    route:{},
    vehicle:{},
    notificationList:{items:[], total:0},
    deleteModalOpened:false
  };

  state = {
  };

  componentDidMount() {
    this.props.dispatch(getRoute(this.props.match.params.routeId))
    this.props.dispatch(getVehicle(this.props.match.params.id))
  }
doRemove = () => {
  this.props.dispatch(deleteRoute(this.props.match.params.routeId)).then(() =>{
    this.props.dispatch(closeDeleteModal())
    const { history } = this.props;
    history.push("/app/vehicles/" + this.props.match.params.id +"/routes");
  }).catch((err) =>{
    console.error(err)
  });
}

openDeleteModal = () =>{
  this.props.dispatch(openDeleteModal())
}



  render() {
    const{route, deleteModalOpened, vehicle, notificationList} = this.props
    return (
      <div className={s.root}>
        {deleteModalOpened ? <DeleteModal isFetching={this.props.isFetching} onAccept={() => this.doRemove()} text={route.id}/> : null}
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Vehiculos</BreadcrumbItem>
          <BreadcrumbItem>{this.props.match.params.id}</BreadcrumbItem>
          <BreadcrumbItem>Rutas</BreadcrumbItem>
          <BreadcrumbItem active>{this.props.match.params.routeId}</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Detalle de la ruta</h1>
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
                   <Maps places={route.positions}/>
              </div>
              
            </Widget>
          </Col>
          <Col md={4}>
          <Widget
              title={
                <h5 className="mt-0 mb-2">
                    Detalles de la ruta
                  </h5>
              }
            >
              <FormGroup>
              <Label className="mr-2">Inicio:</Label>
              <Input
                    id="input-title"
                    type="text"
                    disabled
                    value={moment(route.init).format("DD-MM-YYYY HH:mm")}
                  />
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Fin:</Label>
              <Input
                    id="input-title"
                    type="text"
                    value={moment(route.finish).format("DD-MM-YYYY HH:mm")}
                    disabled
                  />
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Distancia total:</Label>
              <Input
                    id="input-title"
                    type="text"
                    value={(route.total_distance != null ? route?.total_distance.toFixed(2) : '-') + "Km"}
                    disabled
                  />
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Dispositivo GPS:</Label>
              <Input
                    id="input-title"
                    type="text"
                    value={route.gps?.name}
                    disabled
                  />
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Vehiculo:</Label>
              <Input
                    id="input-title"
                    type="text"
                    value={vehicle.model + " " + vehicle.license}
                    disabled
                  />
              </FormGroup>
            </Widget>
            <ListGroup>
              <Link to="/app" className="list-group-item">
                <i className="fa fa-bell-o mr-xs text-secondary" />{' '}
                Notificaciones <Badge className="ml-xs" color="warning">{notificationList.total}</Badge>
              </Link>
            </ListGroup>
            <div className="d-flex justify-content-end mt-5">
                  <ButtonGroup>
                    <Button color="danger" onClick={()=>this.openDeleteModal()}>
                      {'Eliminar'}
                    </Button>
                  </ButtonGroup>
                </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.route.isFetching,
    message: state.route.message,
    errorMessage: state.route.errorMessage,
    route: state.route.route,
    vehicle: state.vehicle.vehicle,
    notificationList: state.notification.notificationList,
    deleteModalOpened: state.navigation.deleteModalOpened,
  };
}

export default connect(mapStateToProps)(DetailRoute);
