import { Component } from "react"

export default class CheckBox extends Component {
  render() {
    return (
      <input
        {...this.props}
        type="checkbox"
        defaultChecked={this.props.isDone}
        className="checker"
      />
    )
  }
}
