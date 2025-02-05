import React from 'react';
import { Button, Row, Col } from 'reactstrap';

import AceEditor from 'react-ace';
import 'brace';
import 'brace/theme/github';

class DetailsTable extends React.Component {

  constructor(props) {
    super(props);
    this.listTestTasks = this.listTestTasks.bind(this);
  }

  listTestTasks = (regionEntry) => {
    const data = this.props.data;
    const testRegion = regionEntry.region;
    return <p key={testRegion}>{testRegion} : {regionEntry.taskCount} {data.status === 'complete' && data.completeTasks !== undefined && `(${data.completeTasks[testRegion]} completed)`}</p>;
  };

  render() {
    const data = this.props.data;
    return (
      <div className="box">
        <Row>
          <Col sm="7">
            <Row className="detail">
              <Col sm="3"><b>ID</b></Col>
              <Col sm="9">{data.testId}</Col>
            </Row>
            <Row className="detail">
              <Col sm="3"><b>NAME</b></Col>
              <Col sm="9">{data.testName}</Col>
            </Row>
            <Row className="detail">
              <Col sm="3"><b>DESCRIPTION</b></Col>
              <Col sm="9">{data.testDescription}</Col>
            </Row>
            {
              (!data.testType || ['', 'simple'].includes(data.testType)) &&
              <div>
                <Row className="detail">
                  <Col sm="3"><b>ENDPOINT</b></Col>
                  <Col sm="9">{data.endpoint}</Col>
                </Row>
                <Row className="detail">
                  <Col sm="3"><b>METHOD</b></Col>
                  <Col sm="9">{data.method}</Col>
                </Row>
                <Row className="detail">
                  <Col sm="3"><b>HEADERS</b></Col>
                  <Col sm="9">
                    <AceEditor
                      id="headers"
                      name="headers"
                      value={JSON.stringify(data.headers, null, 2)}
                      mode="json"
                      theme="github"
                      width="100%"
                      maxLines={10}
                      showPrintMargin={false}
                      showGutter={false}
                      readOnly={true}
                      editorProps={{ $blockScrolling: true }}
                    />
                  </Col>
                </Row>
                <Row className="detail">
                  <Col sm="3"><b>BODY</b></Col>
                  <Col sm="9">
                    <AceEditor
                      id="body"
                      name="body"
                      value={JSON.stringify(data.body, null, 2)}
                      mode="json"
                      theme="github"
                      width="100%"
                      maxLines={10}
                      showPrintMargin={false}
                      showGutter={false}
                      readOnly={true}
                      editorProps={{ $blockScrolling: true }}
                    />
                  </Col>
                </Row>
              </div>
            }
            {
              data.status === 'complete' &&
              <Row className="detail">
                <Col sm="3"><b>FULL TEST RESULTS</b></Col>
                <Button className="btn-link-custom" color="link" size="large" onClick={this.props.handleFullTestDataLocation}>Link to results files in S3</Button>
                <Col sm="9">You must be logged into your AWS account to access the results in S3</Col>
              </Row>}
            {
              data.testType && data.testType !== '' && data.testType !== 'simple' &&
              <Row className="detail">
                <Col sm="3"><b>{data.fileType === 'zip' ? 'ZIP' : 'SCRIPT'}</b></Col>
                <Col sm="9"><Button className="btn-link-custom" color="link" size="sm" onClick={this.props.handleDownload}>Download</Button></Col>
              </Row>
            }
          </Col>
          <Col sm="5">
            <Row className="detail">
              <Col sm="4"><b>STATUS</b></Col>
              <Col className={data.status} sm="8">{data.status}</Col>
            </Row>
            <Row className="detail">
              <Col sm="4"><b>STARTED AT</b></Col>
              <Col sm="8">{data.startTime}</Col>
            </Row>
            {
              data.status === 'complete' &&
              <Row className="detail">
                <Col sm="4"><b>ENDED AT</b></Col>
                <Col sm="8">{data.endTime}</Col>
              </Row>
            }
            {
              data.recurrence && data.recurrence !== '' &&
              <Row className="detail">
                <Col sm="4"><b>RECURRENCE</b></Col>
                <Col sm="8" className="recurrence">{data.recurrence}</Col>
              </Row>
            }
            <Row className="detail">
              <Col sm="4"><b>TASK COUNT</b></Col>
              <Col sm="8">{data.testTaskConfigs.map((regionEntry) => { return this.listTestTasks(regionEntry); })}</Col>
            </Row>

            <Row className="detail">
              <Col sm="4"><b>CONCURRENCY</b></Col>
              <Col sm="8">{data.testTaskConfigs.map((regionEntry) => { return <p key={regionEntry.region}>{regionEntry.region} : {regionEntry.concurrency}</p>; })}</Col>
            </Row>
            <Row className="detail">
              <Col sm="4"><b>RAMP UP</b></Col>
              <Col sm="8">{data.rampUp}</Col>
            </Row>
            <Row className="detail">
              <Col sm="4"><b>HOLD FOR</b></Col>
              <Col sm="8">{data.holdFor}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DetailsTable;