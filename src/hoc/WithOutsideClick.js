import React, { Component } from 'react';

/**
 * Component that alerts if you click outside of it
 */
export default class ClickOutside extends Component {

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = (node) => {
    if (node) {
      this.wrapperRef = node;
    }
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = (event) => {
    const { executeMethod } = this.props
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      executeMethod()
    }
  }

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}
