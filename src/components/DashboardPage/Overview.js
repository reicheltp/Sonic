/**
 * Created by Paul on 23-Apr-17.
 */
import React, {Component, PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';
import {Line, Circle} from 'rc-progress';
import {Nav, NavItem, Col, Row} from 'react-bootstrap';

function HistoryItem ({item}) {
  return(
    <div style={{margin:10, textAlign:'center'}}>
      <Circle
        percent={item.rollout}
        strokeWidth={6}
      />
      <h5>{item.date}</h5>
    </div>
  );
}

function Overview({}) {
  const deployment = {rollout: 68, date:'24.07.2017'};

  const history = [1,2,3,4,5].map(itm => {
    return {
      id: itm,
      rollout: 75,
      date: '32.23.3001'
    }
  });

  return (
    <div style={{marginTop:20}}>
      <Row>
        <Col md={3}>
          <div style={{margin:10, textAlign:'center'}}>
            <Circle
              percent={deployment.rollout}
              strokeWidth={6}
            />
            <h5>{deployment.date}</h5>
          </div>
        </Col>
        <Col md={9}>
          <h3>Successful deployed on {deployment.rollout}% of the devices.</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <div style={{margin:10}}>
            <h3>History</h3>
            <div style={{display:'flex'}}>
              {history.map(itm => <HistoryItem item={itm} />)}
            </div>
          </div>

        </Col>
      </Row>
    </div>
  );
}

export default Overview;
