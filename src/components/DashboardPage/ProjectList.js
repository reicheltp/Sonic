import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Line, Circle } from 'rc-progress';
import {
  ListGroup, ListGroupItem, Col,
  FormGroup, InputGroup,
  Glyphicon, FormControl, Row,
  Button,
} from 'react-bootstrap';
import NewProjectWizard from './NewProjectWizard';

function SearchBar({}) {
  return (
    <FormGroup>
      <InputGroup>
        <FormControl type="text" placeholder="Search all repositories" />
        <InputGroup.Addon>
          <Glyphicon glyph="search" />
        </InputGroup.Addon>
      </InputGroup>
    </FormGroup>
  );
}

function ProjectItem({ item }) {
  return (
    <ListGroupItem href={`/projects/${item.id}`} key={item.id}>
      <h4><FontAwesome name="github" /> <span style={{ align: 'right' }}>{item.name}</span></h4>
      <h5><FontAwesome name="code-fork" /> <span style={{ align: 'right' }}>{item.lastVersion}</span></h5>
      <Line percent={item.rollout} strokeWidth="2" strokeColor="#1347AE" />
    </ListGroupItem>
  );
}

class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      showNew: false,
    };
  }

  saveNewProject(itm) {
  }

  render() {
    const {
      showNew,
    } = this.state;
    const projects = [
      {
        id: 4,
        name: 'wercker/wercker2',
        lastVersion: '2.7.1',
        rollout: 95,
      },
      {
        id: 2,
        name: 'devops_company/MonitoringApp',
        lastVersion: '0.3.1-alpha',
        rollout: 35,
      },
      {
        id: 3,
        name: 'SandraKriemann/HelloDeliveryOfThingsWorld',
        lastVersion: '001de8bd',
        rollout: 100,
      },
      {
        id: 1,
        name: "awesome_company/ImportantApp",
        lastVersion: '3.1',
        rollout: 90,
      },
    ];

    return (
      <div>
        <Row>
          <div style={{ margin: 15, marginBottom: 60, marginTop: 20, display: 'flex', flowDirection: 'row' }}>
            <div style={{ flex: 1, marginRight: 10 }}>
              <SearchBar />
            </div>
            <div>
              <Button bsStyle="primary" onClick={() => this.setState({ showNew: true })}>Add Project</Button>
            </div>
          </div>
        </Row>
        <Row>
          <ListGroup>
            {projects.map(itm =>
              <ProjectItem item={itm} />
            )}
          </ListGroup>
        </Row>

        <NewProjectWizard
          show={showNew}
          onHide={() => this.setState({ showNew: false })}
          onSave={itm => this.saveNewProject(itm)}
        />
      </div>
    );
  }

}

export default ProjectList;
