/**
 * Created by Paul on 24-Apr-17.
 */
/* @flow */

import * as React from 'react';
import {
  Modal, Button,
  FormGroup, FormControl,
  ControlLabel, ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import FormDialog from '../UI/FormDialog';

class NewProjectWizard extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    const {
      show, onHide, onSave
    } = this.props;

    const projects = [1,2,3].map(itm => {
      return {
        id: itm,
        name: "mycompany/Project",
        branches: ['develop', 'master'],
      };
    });

    console.log(this.state);

    const branches = this.state.project >= 0
      ? projects[this.state.project].branches
      : false;

    return (
      <FormDialog
        title="Add Project from Github"
        saveTitle="Add Project"
        canSave={this.state.branch != undefined && this.state.branch != '-1'}
        onChange={val => this.setState(val)}
        {...this.props}
      >
        <FormDialog.Group
          id="project" label="Project"
          componentClass="select"
        >
          <option value="-1">Select Project ...</option>
          { projects.map(itm => <option value={itm.id}>{itm.name}</option>) }
        </FormDialog.Group>

        <FormDialog.Group
          id="branch" label="Branch"
          componentClass="select" disabled={!branches}
        >
          <option name="select">Select Branch ...</option>
          { branches && branches.map(itm => <option value={itm}>{itm}</option>) }
        </FormDialog.Group>

      </FormDialog>
    );
  }
}

export default NewProjectWizard;
