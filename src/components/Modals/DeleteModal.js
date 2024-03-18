import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { closeDeleteModal } from '../../actions/navigation';

class DeleteModal extends React.Component {
    onCancel = () =>{
      this.props.dispatch(closeDeleteModal())
    }

    render(){
    return (
          <Modal isOpen={true}>
            <ModalHeader toggle={() => this.onCancel()}>Eliminar {this.props.text}</ModalHeader>
            <ModalBody>
              ¿Estas seguro que desea eliminarlo?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.props.onAccept}>
                {this.props.isFetching ? "Borrando.." : "Si, estoy seguro"}
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
  };
}

export default connect(mapStateToProps)(DeleteModal);