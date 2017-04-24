/**
 * Created by Paul on 23-Apr-17.
 */
import React, {Component, PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';
import {Line, Circle} from 'rc-progress';
import { Nav, NavItem, Table} from 'react-bootstrap';

function DeviceItem({item}) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.device}</td>
      <td>{item.deviceType}</td>
      <td>{item.version}</td>
      <td />
    </tr>
  );
}

function Devices({}) {
  const devices = [1, 2, 3, 4].map(itm => {
    return {
      id: itm,
      name: `Device ${itm}`,
      version: '1.2.3-alpha',
      device: 'Android',
      deviceType: 'Galaxy S7',
    };
  });

  return (
    <Table containerStyle={{ width: '100%' }} striped hover>
      <tbody>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>OS</th>
          <th>Type</th>
          <th>Version</th>
          <th style={{ maxWidth: '99%' }} />
        </tr>
        {devices.map(itm => <DeviceItem item={itm} />)}
      </tbody>
    </Table>
  );
}

export default Devices;
