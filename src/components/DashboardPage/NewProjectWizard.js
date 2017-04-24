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
import {gql, graphql} from 'react-apollo';

class NewProjectWizard extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.data.refetch();
  }

  render() {
    const {
      show, onHide, onSave
    } = this.props;

    const {
      repos
    } = this.props.data;

    console.log(this.state);

    const branches = this.state.project >= 0
      ? repos.find(val => val.id == this.state.project).branches
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
          componentClass="select" disabled={!repos}
        >
          <option value="-1">Select Project ...</option>
          { repos && repos.map(itm => <option value={itm.id}>{itm.name}</option>) }
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

const FetchData = gql`query{ repos { id, name, branches, __typename } }`;

const NewProjectWizardWithData = graphql(FetchData)(NewProjectWizard);

export default NewProjectWizardWithData;
