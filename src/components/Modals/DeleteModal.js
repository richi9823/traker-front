import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteModal extends React.Component {
    render(){
    return (
          <Modal isOpen={true}>
            <ModalHeader toggle={this.props.onCancel}>Eliminar {this.props.text}</ModalHeader>
            <ModalBody>
              ¿Estas seguro que desea eliminarlo?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.props.onAccept}>
                {this.props.isFetching ? "Borrando.." : "Si, estoy seguro"}
              </Button>{' '}
              <Button color="secondary" onClick={this.props.onCancel}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
      );
    }
  
}

export default DeleteModal;