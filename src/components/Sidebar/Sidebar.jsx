import { Component } from "react"
import CheckBox from "../ui/CheckBox"
import Input from "../ui/Input"

export default class Sidebar extends Component {
  state = {
    searchTerm: "",
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value })
    this.props.onSearchChange(e.target.value)
  }

  render() {
    const { searchTerm } = this.state
    const {
      showIncomplete,
      toggleShowIncomplete,
      toggleSeverityFilter,
      severityFilters,
    } = this.props

    return (
      <div className="sidebar">
        <h2>Фильтры задач</h2>
        <Input
          value={searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Поиск задач"
        />
        <div className="severity-filters">
          <h3>Важность</h3>
          <label>
            <CheckBox
              label="Срочно"
              checked={severityFilters.urgent}
              onChange={() => toggleSeverityFilter("urgent")}
            />
            Срочно
          </label>
          <label>
            <CheckBox
              label="Средне"
              checked={severityFilters.medium}
              onChange={() => toggleSeverityFilter("medium")}
            />
            Средне
          </label>
          <label>
            <CheckBox
              label="Не срочно"
              checked={severityFilters.notUrgent}
              onChange={() => toggleSeverityFilter("notUrgent")}
            />
            Не срочно
          </label>
          <label>
            <CheckBox
              label="Только невыполненные"
              checked={showIncomplete}
              onChange={toggleShowIncomplete}
            />
            Только невыполненные
          </label>
        </div>
      </div>
    )
  }
}
