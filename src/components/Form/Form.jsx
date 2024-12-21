import { Component } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import PropTypes from "prop-types"


export default class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      severity: "medium",
      error: "",
    }
  }

  validateInput = (title) => {
    if (!title.trim()) {
      return "Имя задачи не может быть пустым или содержать пробелы в начале/конце"
    }
    return ""
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value })
  }

  handleSeverityChange = (level) => {
    this.setState({ severity: level })
  }

  handleAddTask = () => {
    const { title, description, severity } = this.state
    const error = this.validateInput(title, description)

    if (error) {
      this.setState({ error })
      return
    }

    this.props.addTask({
      title: title.trim(),
      description: description.trim(),
      severity,
      isDone: false,
      createdAt: new Date().toLocaleString(),
    })

    this.setState({ title: "", description: "", severity: "medium", error: "" })
  }

  render() {
    const { title, description, severity, error } = this.state

    return (
      <div className="form">
        <Input
          type="text"
          placeholder="Введите заголовок задачи"
          value={title}
          onChange={this.handleTitleChange}
          className="input"
        />
        <Input
          type="text"
          placeholder="Введите описание задачи"
          value={description}
          onChange={this.handleDescriptionChange}
          className="input"
        />
        <div className="severity-buttons">
          <Button
            className={severity === "urgent" ? "selected" : ""}
            onClick={() => this.handleSeverityChange("urgent")}
            name="Срочно"
            type="button"
          />
          <Button
            className={severity === "medium" ? "selected" : ""}
            onClick={() => this.handleSeverityChange("medium")}
            name="Средне"
            type="button"
          />
          <Button
            className={severity === "notUrgent" ? "selected" : ""}
            onClick={() => this.handleSeverityChange("notUrgent")}
            name="Не срочно"
            type="button"
          />
        </div>
        <Button
          className="button"
          onClick={this.handleAddTask}
          name="Добавить"
        />
        {error && <p className="error">{error}</p>}
      </div>
    )
  }

  static propTypes = {
    addTask: PropTypes.func.isRequired,
  }
  
}
