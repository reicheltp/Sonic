import React, {Component, PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';
import {Line, Circle} from 'rc-progress';
import { Nav, NavItem} from 'react-bootstrap';
import Settings from './Settings';
import Devices from './Devices';
import Overview from './Overview';

function renderTab(selectedTab, id) {
  if (selectedTab == 'devices') {
    return <Devices id={id}/>;
  } else if (selectedTab == 'settings') {
    return <Settings id={id}/>;
  }
  else {
    return <Overview id={id}/>;
  }
}

function ProjectDetail({selectedTab, id}) {
  const projects= [
    {
      id: id,
      name: "company/myapp",
    },
    {
      id: id,
      name: "company/myapp",
    },
    {
      id: id,
      name: "company/myapp",
    },
    {
      id: id,
      name: "company/myapp",
    },
  ];

  const project = projects[id];

  if (selectedTab === undefined) {
    selectedTab = 'overview';
  }

  return (
    <div>
      <h1>{project.name} <FontAwesome name="github"/></h1>
      <Nav bsStyle="tabs" activeKey={selectedTab}>
        <NavItem eventKey="overview" href={`/projects/${project.id}`}>Overview</NavItem>
        <NavItem eventKey="devices" href={`/projects/${project.id}/devices`}>Devices</NavItem>
        <NavItem eventKey="settings" href={`/projects/${project.id}/settings`}>Settings</NavItem>
      </Nav>
      <div>
        {renderTab(selectedTab, project.id)}
      </div>
    </div>
  );
}

export default ProjectDetail;
