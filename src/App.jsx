import { Component } from "react"
import "./styles/App.css"
import Form from "./components/Form/Form"
import Todos from "./components/Todos/Todos"
import Counter from "./components/Counter/Counter"
import Sidebar from "./components/Sidebar/Sidebar"
import Button from "./components/ui/Button"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      showIncomplete: false,
      severityFilters: {
        urgent: false,
        medium: false,
        notUrgent: false,
      },
      searchTerm: "",
    }
  }

  generateUniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9)
  }

  addTask = (task) => {
    const newTask = {
      ...task,
      id: this.generateUniqueId(),
      isDone: false,
      createdAt: new Date().toLocaleString(),
    }
    this.setState({ todos: [...this.state.todos, newTask] })
  }

  generateRandomTasks = (count) => {
    const randomTasks = Array.from({ length: count }, () => {
      return {
        title: `Задача ${Math.floor(Math.random() * 10000)}`,
        description: `Описание задачи ${Math.floor(Math.random() * 10000)}`,
        severity: ["urgent", "medium", "notUrgent"][
          Math.floor(Math.random() * 3)
        ],
      }
    })
    this.setState((prevState) => ({
      todos: [
        ...prevState.todos,
        ...randomTasks.map((task) => ({
          ...task,
          id: this.generateUniqueId(),
          isDone: false,
          createdAt: new Date().toLocaleString(),
        })),
      ],
    }))
  }

  handleDelete = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id)
    this.setState({ todos: updatedTodos })
  }

  handleChangeIsDone = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone }
      }
      return todo
    })
    this.setState({ todos: updatedTodos })
  }

  toggleShowIncomplete = () => {
    this.setState({ showIncomplete: !this.state.showIncomplete })
  }

  toggleSeverityFilter = (level) => {
    this.setState((prevState) => ({
      severityFilters: {
        ...prevState.severityFilters,
        [level]: !prevState.severityFilters[level],
      },
    }))
  }

  handleSearchChange = (searchTerm) => {
    this.setState({ searchTerm })
  }

  render() {
    const { searchTerm, severityFilters, showIncomplete } = this.state

    const filteredTodos = this.state.todos.filter((todo) => {
      const isIncomplete = showIncomplete ? !todo.isDone : true
      const isSeverityMatched = Object.keys(severityFilters)
        .filter((key) => severityFilters[key])
        .includes(todo.severity)

      const isSearchTermMatched =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())

      return (
        isIncomplete &&
        (Object.keys(severityFilters).some((key) => severityFilters[key])
          ? isSeverityMatched
          : true) &&
        (searchTerm ? isSearchTermMatched : true)
      )
    })

    const totalTasks = this.state.todos.length
    const completedTasks = this.state.todos.filter((todo) => todo.isDone).length
    const incompleteTasks = totalTasks - completedTasks

    return (
      <div className="app">
      <h1>To Do List</h1>
      <Counter
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        incompleteTasks={incompleteTasks}
      />
      <div className="app-container" style={{ display: 'flex' }}>
        <div className="sidebar-container" style={{ flex: '0 0 250px', marginRight: '20px' }}>
          <Sidebar
            showIncomplete={showIncomplete}
            toggleShowIncomplete={this.toggleShowIncomplete}
            toggleSeverityFilter={this.toggleSeverityFilter}
            severityFilters={severityFilters}
            onSearchChange={this.handleSearchChange}
          />
        </div>
        <div className="todos-container" style={{ flex: '1' }}>
          <Form addTask={this.addTask} />
          <Button
            onClick={() => this.generateRandomTasks(100)}
            className="add-random-tasks"
            name="Добавить много задач"
          />
            {filteredTodos.length > 0 ? (
              <Todos
                todos={filteredTodos}
                handleDelete={this.handleDelete}
                handleChangeIsDone={this.handleChangeIsDone}
              />
            ) : (
              <p>По вашим критериям ничего не найдено.</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}
