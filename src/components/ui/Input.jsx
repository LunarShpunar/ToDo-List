import { Component } from "react"

export default class Input extends Component {
  render() {
    return (
      <input
        type={this.props.type || "text"}
        className={`input ${this.props.className || ""}`}
        {...this.props}
      />
    )
  }
}
