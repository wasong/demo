import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FloatingActionButton from 'material-ui/FloatingActionButton'

class OrderCart extends Component {
  state = {}

  render() {
    return (
      <div>
        <FloatingActionButton>ICON</FloatingActionButton>
      </div>
    )
  }
}

OrderCart.propTypes = {}
OrderCart.defaultProps = {}

const mapStateToProps = ({ dashboard: { orders } }) => ({
  orders,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCart)
