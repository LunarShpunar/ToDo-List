import { Component } from "react";
import PropTypes from 'prop-types';

export default class Counter extends Component {
  render() {
    const { totalTasks, completedTasks, incompleteTasks } = this.props;

    return (
      <div className="counter">
        <p>Всего задач: {totalTasks}</p>
        <p>Выполнено задач: {completedTasks}</p>
        <p>Невыполненные задачи: {incompleteTasks}</p>
      </div>
    );
  }
}

Counter.propTypes = {
  totalTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired,
  incompleteTasks: PropTypes.number.isRequired
};
