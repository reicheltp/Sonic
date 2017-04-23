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
import {ListGroup, ListGroupItem, Col} from 'react-bootstrap';

function ProjectItem({item}) {
  item = {
    id: item,
    name: 'company/project-awesome',
    lastVersion: '1.2.3-beta',
    rollout: 35,
    date: '2017-07-23T12:23:45'
  };

  return (
    <ListGroupItem href={`/projects/${item.id}`}>
      <table><tbody>
        <tr>
          <td><FontAwesome name="github"/> <span style={{align:'right'}}>{item.name}</span></td>
        </tr>
        <tr>
          <td><FontAwesome name="code-fork"/> <span style={{align:'right'}}>{item.lastVersion}</span></td>
        </tr>
        <tr>
          <td><Line percent={item.rollout} strokeWidth="4" strokeColor="#1347AE"/></td>
        </tr>
      </tbody></table>
    </ListGroupItem>
  );
}

function ProjectList () {
  const projects = [1,2,3,4];

  return (
    <ListGroup>
      {projects.map(itm =>
        <ProjectItem item={itm}/>
      )}
    </ListGroup>
  );
}

function DashboardPage({children}) {
  return (
    <div className={s.root}>
      <div>
        <Col md={4}>
          <ProjectList/>
        </Col>
        <Col md={8}>
          {children && {...children}}
        </Col>
      </div>
    </div>
  );
}

export default withStyles(DashboardPage, s);
