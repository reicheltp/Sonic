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
import ProjectList from './ProjectList';

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
