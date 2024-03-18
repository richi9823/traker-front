import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Form, Alert, FormGroup, Label, Input, ButtonGroup, ModalFooter } from 'reactstrap';
import { closeModalGPS } from '../../actions/gps';

class AddGPSModal extends React.Component {

  static defaultProps = {
    isFetching: false,
    errorMessage: null,
  };

    state = {
        form:{
            name:"",
            device_register_id:""
        }
      };

      handleChange = (event) => {
        const {
          target: {
            type, name, checked, value,
          },
        } = event;
        const newValue = type === 'checkbox' ? checked : value;
    
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            [name]: newValue,
          },
        }));
      };

      clickAddGps = () =>{
        const {form} = this.state;
        this.props.addGPS(form);
      }

      onCancel = () =>{
        this.props.dispatch(closeModalGPS())
      }

    render(){
    return (
          <Modal isOpen={true}>
            <ModalHeader>Añadir dispositivo GPS</ModalHeader>
            <ModalBody>
            <Form onSubmit={() => this.clickAddGps()}>
                {this.props.errorMessage && (
                  <Alert className="alert-sm alert-danger" bsstyle="danger">
                    {this.props.errorMessage}
                  </Alert>
                )}
                <FormGroup>
                  <Label for="input-title">Nombre</Label>
                  <Input
                    id="input-title"
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    value={this.state.form.name}
                    required
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="input-content">Dispositivo ID</Label>
                  <Input
                    id="input-content"
                    type="text"
                    placeholder="Dispositivo ID"
                    name="device_register_id"
                    value={this.state.form.device_register_id}
                    required
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.clickAddGps()}>
                {this.props.isFetching ? 'Añadiendo...' : 'Añadir'}
              </Button>{' '}
              <Button color="secondary" onClick={() => this.onCancel()}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
      );
    }
  
}
function mapStateToProps(state) {
  return {
    isFetching: state.vehicle.isFetching,
    errorMessage: state.vehicle.errorMessage
  };
}

export default connect(mapStateToProps)(AddGPSModal);