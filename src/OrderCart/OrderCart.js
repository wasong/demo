import React, { Component } from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import List from './List'

const styles = {
  root: {
    position: 'fixed',
    right: 10,
    bottom: 10,
    zIndex: 2,
  },
}

class OrderCart extends Component {
  state = {
    open: false,
  }

  toggleDisplay = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <div style={styles.root}>
        <List created={[]} open={this.state.open} />
        <FloatingActionButton onClick={this.toggleDisplay}>ICON</FloatingActionButton>
      </div>
    )
  }
}

OrderCart.propTypes = {}
OrderCart.defaultProps = {}

export default Radium(OrderCart)
