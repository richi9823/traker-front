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
} from 'reactstrap';
import s from './DetailRoute.module.scss';
import Widget from '../../../components/Widget/Widget';
import Maps from '../../google/Google';
import moment from 'moment';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { getRoute } from '../../../actions/route';


class DetailRoute extends Component {
  /* eslint-disable */
  static propTypes = {
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    route: PropTypes.object.isRequired,
    notificationList: PropTypes.object.isRequired
  };
  /* eslint-enable */

  static defaultProps = {
    isFetching: false,
    message: null,
    errorMessage: null,
    route:{},
    notificationList:{items:[], total:0}
  };

  state = {
    showDeleteModal:false,
  };

  componentDidMount() {
    this.props.dispatch(getRoute(this.props.match.params.routeId))
  }
doRemove = () => {
  this.props.dispatch(this.deleteRoute(this.props.match.params.routeId)).then(() =>{
    const { history } = this.props;
    history.push("/app/vehicles/" + this.props.match.params.id +"/routes");
  }).catch((err) =>{
    console.error(err)
  });
}

openDeleteModal = () =>{
  this.setState({showDeleteModal:true})
}



  render() {
    const{route} = this.props
    const {showError, showDeleteModal} = this.state;
    return (
      <div className={s.root}>
        {showDeleteModal ? <DeleteModal isFetching={this.props.isFetching} onAccept={() => this.doRemove()} onCancel={()=> this.setState({showDeleteModal:false})} text={route.id}/> : null}
        <Breadcrumb>
          <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
          <BreadcrumbItem>Vehiculos</BreadcrumbItem>
          <BreadcrumbItem>{this.props.match.params.id}</BreadcrumbItem>
          <BreadcrumbItem>Rutas</BreadcrumbItem>
          <BreadcrumbItem active>{this.props.match.params.routeId}</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="mb-lg">Detalle de la ruta</h1>
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
                <span>
                    <span className="fw-semi-bold"> {moment(route.init).format("DD-MM-YYYY HH:mm")}</span>
                </span>
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Fin:</Label>
                <span>
                    <span className="fw-semi-bold">{ moment(route.finish).format("DD-MM-YYYY HH:mm")}</span>
                </span>
              </FormGroup>
              <FormGroup>
              <Label className="mr-2">Distancia total:</Label>
                <span>
                    <span className="fw-semi-bold">{ route.total_distance != null ? route?.total_distance.toFixed(2) : '-' } Km</span>
                </span>
              </FormGroup>
            </Widget>
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
    notificationList: state.notification.notificationList
  };
}

export default connect(mapStateToProps)(DetailRoute);
