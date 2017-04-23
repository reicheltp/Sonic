import React, {Component, PropTypes} from 'react';
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
      <table style={{width:'100%'}}><tbody>
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

export default ProjectList;