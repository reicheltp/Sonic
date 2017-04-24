/**
 * Created by Paul on 24-Apr-17.
 */
/* @flow */

import * as React from 'react';
import {
  Modal, Button,
  FormGroup, FormControl,
  ControlLabel, ListGroup,
  ListGroupItem, Image,
  ProgressBar
} from 'react-bootstrap';
import FormDialog from '../UI/FormDialog';
import {gql, graphql} from 'react-apollo';
import FontAwesome from 'react-fontawesome';

class NewProjectWizard extends React.Component {
  constructor() {
    super();
    this.state = {step:1};
  }

  componentDidMount() {
    setTimeout(() => this.data.refetch(), 100);
    this.setState({step:1});
  }

  render() {
    const {
      show, onHide, onSave
    } = this.props;

    const {
      repos
    } = this.props.data;

    console.log(this.state);
    console.log(this.props.data);

    const branches = this.state.project >= 0
      ? repos.find(val => val.id == this.state.project).branches
      : false;

    const step = this.state.step;

    return (
      <FormDialog
        title={<span>Add Project from Github <FontAwesome name="github" /></span>}
        saveTitle={step == 1 && "Add Project"}
        canSave={this.state.branch != undefined && this.state.branch != '-1'}
        onChange={val => this.setState((state) => {return {...state, ...val}})}
        onSave={() => {
          this.setState({step:2, progress:0});

          let i = setInterval(() => {
            this.setState(s => {return {progress: s.progress+1}}, () => {
              if(this.state.progress >= 100){
                clearInterval(i);
                this.setState({step:3})
              }
            });
          }, 300);

          this.prop.onSave();
        }}
        show={show}
        onHide={onHide}
      >
        {step == 1 &&
        <FormDialog.Group
          id="project" label="Project"
          componentClass="select" disabled={!repos}
        >
          <option value="-1">Select Project ...</option>
          { repos && repos.map(itm => <option value={itm.id}>{itm.name}</option>) }
        </FormDialog.Group>
        }

        {step == 1 &&
        <FormDialog.Group
          id="branch" label="Branch"
          componentClass="select" disabled={!branches}
        >
          <option name="select">Select Branch ...</option>
          { branches && branches.map(itm => <option value={itm}>{itm}</option>) }
        </FormDialog.Group>
        }

        {step == 2 &&
        <div style={{textAlign:'center'}}>
          <Image src={require('../Header/sonic-deployment-system.png')}/>
          <h2>Preparing your project...</h2>
          <ProgressBar active now={this.state.progress}/>
        </div>
        }

        { step == 3 &&
        <div style={{textAlign:'center'}}>
          <Image src={require('../Header/sonic-deployment-system.png')}/>
          <h2>Successful imported</h2>
          <h3>Now <b>you</b> can code, and we deploy!</h3>
        </div>
        }
      </FormDialog>
    );
  }
}

const FetchData = gql`query{ repos { id, name, branches, __typename } }`;

const NewProjectWizardWithData = graphql(FetchData, {fetchPolicy: 'no-cache'})(NewProjectWizard);

export default NewProjectWizardWithData;
