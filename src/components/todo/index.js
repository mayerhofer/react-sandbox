import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Form,
  Button,
  ListGroup,
  Popover,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";

import * as actions from "../../actions/activityActions";
import "./todo.css";

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>
);

class TodoBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: ""
    };
  }

  handleChange(e) {
    this.setState(Object.assign({}, this.state, { newTask: e.target.value }));
  }

  handleSubmit(e) {
    e.preventDefault();
    let maxId = Math.max(...this.props.activities.map(a => a.elementId));
    let newActivity = {
      name: this.state.newTask,
      elementId: maxId + 1
    };
    this.props.add(newActivity);
    this.setState(Object.assign({}, this.state, { newTask: "" }));
  }

  render() {
    return (
      <div>
        <div className="list">
          <ListGroup>
            {this.props.activities.map(item => (
              <ListGroup.Item key={item.elementId} variant="info">
                <OverlayTrigger overlay={<Tooltip>Test</Tooltip>}>
                  <div>{item.name}</div>
                </OverlayTrigger>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div className="todo">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group controlId="formTodoList">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new task"
                value={this.state.newTask}
                onChange={this.handleChange.bind(this)}
              />
              <Form.Text className="text-muted">
                Add new task to To Do list.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return {
    activities: state.activities
  };
};

let mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoBox);
