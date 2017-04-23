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

function ProjectItem({item}) {
  item = {
    name: 'company/project-awesome',
    lastVersion: '1.2.3-beta',
    rollout: 35,
    date: '2017-07-23T12:23:45'
  };

  return (
    <div style={{margin: 10}}>
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
    </div>
  );
}

function ProjectList () {
  const projects = [1,2,3,4];

  return (
    <div>
      {projects.map(itm =>
        <ProjectItem item={itm}/>
      )}
    </div>
  );
}

function DashboardPage({children}) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div>
          <ProjectList/>
        </div>
        <div>
          {children && {...children}}
        </div>
      </div>
    </div>
  );
}

export default withStyles(DashboardPage, s);
