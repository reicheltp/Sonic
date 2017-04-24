/**
 * Created by Paul on 24-Apr-17.
 */
/* @flow */

import * as React from 'react';
import {
  Modal, Button,
  FormGroup, FormControl,
  ControlLabel,
} from 'react-bootstrap';

function FieldGroup({id, label, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl name={id} {...props} />
    </FormGroup>
  );
}

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    React.Children.forEach(this.props.children,
      child => child.props.id && child.props.defaultValue
      && this.setState({
        [child.props.id]: child.props.defaultValue,
      }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    }, () => this.props.onChange(this.state));
  }

  render() {
    const {
      show, children,
      title,
      saveTitle,
      canSave = true,
      onHide = () => {
      },
      onSave = () => {
      },
    } = this.props;

    return (
      <Modal show={show} onHide={onHide} dialogClassName="inmodal">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {React.Children.map(children,
              (child) => React.cloneElement(child, {
                onChange: this.handleInputChange,
              }))
            }
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button bsStyle="primary" onClick={() => onSave(this.state)} disabled={!canSave}>{saveTitle}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

FormDialog.Group = FieldGroup;
export default FormDialog;
