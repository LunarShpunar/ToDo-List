import { Component } from "react"
import CheckBox from "../ui/CheckBox"
import Button from "../ui/Button"

export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
    }
  }

  toggleHover = () => {
    this.setState((prevState) => ({ isHovered: !prevState.isHovered }))
  }

  getSeverityLabel = (severity) => {
    switch (severity) {
      case "urgent":
        return "Срочно"
      case "medium":
        return "Средне"
      case "notUrgent":
        return "Не срочно"
      default:
        return "Без приоритета"
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextState.isHovered !== this.state.isHovered
    )
  }

  render() {
    const { id, title, description, createdAt, isDone, severity } =
      this.props.todo

    return (
      <li
        className="todo"
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <label>
          <CheckBox
            onChange={() => {
              this.props.handleChangeIsDone(id)
            }}
            isDone={isDone}
          />
        </label>
        <div className="todo-content">
          <h1>{title}</h1>
          <p>{description}</p>
          <p className="todo-severity">
            Важность: {this.getSeverityLabel(severity)}
          </p>
        </div>
        {this.state.isHovered ? (
          <Button
            onClick={() => {
              this.props.handleDelete(id)
            }}
            className="delete"
            name={"Delete"}
          />
        ) : (
          <p className="todoDate">{createdAt}</p>
        )}
      </li>
    )
  }
}
