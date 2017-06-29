import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Radium from 'radium'
import RaisedButton from 'material-ui/RaisedButton'
import shortId from 'short-uuid'

import selectionData from './data'
import Selections from './Selections'
import OrderCart from '../OrderCart'
import { actions as dashboardActions } from './dashboard.module'

const styles = {
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  btnWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  create: {
    margin: '24px 0',
    textTransform: 'initial',
    borderRadius: 20,
  },
  createBtn: {
    borderRadius: 20,
  },
}

class Dashboard extends Component {
  state = {}

  render() {
    const {
      orders,
      actions: {
        changeMenu,
        createOrder,
      },
    } = this.props

    return (
      <div style={styles.root}>
        {
          selectionData.map(({
            title,
            subtitle,
            ingredient,
            types,
          }) => (
            <Selections
              onChange={changeMenu}
              ingredient={ingredient}
              key={title}
              title={title}
              subtitle={subtitle}
              types={types}
              selectedTypes={this.props.orders[ingredient]}
            />
          ))
        }
        <OrderCart />
        <div style={styles.btnWrapper}>
          <RaisedButton
            label="Create"
            style={styles.create}
            buttonStyle={styles.createBtn}
            onClick={() => createOrder(shortId().new())}
          />
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  orders: PropTypes.objectOf(PropTypes.node),
}
Dashboard.defaultProps = {
  orders: {},
}

const mapStateToProps = ({ dashboard }) => ({
  ...dashboard,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dashboardActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Dashboard))
