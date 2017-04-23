/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DashboardPage.scss';
import FontAwesome from 'react-fontawesome';
import { Line, Circle } from 'rc-progress';
import {ListGroup, ListGroupItem, Col, Nav, NavItem} from 'react-bootstrap';
import ProjectList from './ProjectList';

function ProjectDetail({selectedTab}){
  const project = {
    name: "company/myapp",
  };

  if(selectedTab === undefined){
    selectedTab = 'overview';
  }

  return (
    <div>
      <h1>{project.name} <FontAwesome name="github"/></h1>
      <Nav bsStyle="tabs" activeKey={selectedTab}>
        <NavItem eventKey="overview" href={`/projects/${project.id}`}>Overview</NavItem>
        <NavItem eventKey="devices"  href={`/projects/${project.id}/devices`}>Devices</NavItem>
        <NavItem eventKey="settings"  href={`/projects/${project.id}/settings`}>Settings</NavItem>
      </Nav>
    </div>
  );
}

function DashboardPage({children, projectId, selectedTab}) {
  return (
    <div className={s.root}>
      <div>
        <Col md={4}>
          <ProjectList/>
        </Col>
        <Col md={8}>
          <ProjectDetail id={projectId} selectedTab={selectedTab}/>
          {/*children && {...children} */}
        </Col>
      </div>
    </div>
  );
}

export default withStyles(DashboardPage, s);
