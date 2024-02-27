import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup,
  Alert,
  Label,
} from 'reactstrap';
import { connect } from 'react-redux';

import Widget from '../Widget/Widget';

import { createVehicle } from '../../actions/vehicle';
import s from './RegisterVehicle.module.scss';

class PostNew extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.string,
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    isFetching: false,
    message: null,
  };

  static meta = {
    title: 'Registrar nuevo vehiculo',
    description: 'Rellena los datos para registrar el nuevo vehiculo',
  };

  constructor(props) {
    super(props);

    this.state = {
      model: '',
      license: '',
      device_register_id: '',
    };
  }

  changeModel = (event) => {
    this.setState({model: event.target.value});
  }

  changeLicense = (event) => {
    this.setState({license: event.target.value});
  }

  changeDeviceRegisterId = (event) => {
    this.setState({device_register_id: event.target.value});
  }

  doCreateVehicle = (e) => {
    this.props
      .dispatch(
        createVehicle({
          model: this.state.model,
          license: this.state.license,
          device_register_id: this.state.device_register_id
        }),
      )
      .then(() =>
        this.setState({
          model: '',
          license: '',
          device_register_id:''
        }),
      );
    e.preventDefault();
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col sm={12}>
            <Widget
              title={
                <span>
                  <h5 class="mt-0 mb-0">Registro rápido</h5>
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
                      {this.props.isFetching ? 'Registrando...' : 'Registrar'}
                    </Button>
                  </ButtonGroup>
                </div>
              </Form>
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
  };
}

export default connect(mapStateToProps)(PostNew);
