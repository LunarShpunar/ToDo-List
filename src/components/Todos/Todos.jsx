import { Component } from "react"
import Todo from "./Todo"

export default class Todos extends Component {
  render() {
    const sortedTodos = [...this.props.todos].sort((a, b) => {
      return a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1
    })

    return (
      <ul>
        {sortedTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleDelete={this.props.handleDelete}
            handleChangeIsDone={this.props.handleChangeIsDone}
          />
        ))}
      </ul>
    )
  }
}
