import { Component } from "react"

export default class Button extends Component {
  render() {
    return (
      <button className={this.props.className} onClick={this.props.onClick}>
        {this.props.name}
      </button>
    )
  }
}
