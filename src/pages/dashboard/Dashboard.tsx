import React from 'react';
import { Row, Col, Panel, ButtonGroup, Button,Dropdown, Affix } from 'rsuite';
import ProgressSteps from './ProgressSteps';
import PieChart from './PieChart';
import LineChart from '@/components/charts/lineChart';
import DetailIcon from '@rsuite/icons/Detail';
import Map from './Map';


const Dashboard = () => {
  return (
      <Row gutter={30} >
      <Col xs={16} > 
          <ProgressSteps/>
        </Col>
        <Col xs={8}>
          <Affix>
            <Panel className="card" header="Core Condition">
            <Dropdown title="File" icon={<DetailIcon />}>
              <Dropdown.Item >
                Core 1
              </Dropdown.Item>
              <Dropdown.Item >
                Core 2
              </Dropdown.Item>
              <Dropdown.Item >
                Core 3
              </Dropdown.Item>
              <Dropdown.Item >
                Core 4
              </Dropdown.Item>
            </Dropdown>
              <LineChart/>
            </Panel>
          </Affix>
        </Col>
        <Col xs={8}>
          <Affix top={400}>
            <Map/>
          </Affix>
          
        </Col>
      </Row>
  );
};

export default Dashboard;
