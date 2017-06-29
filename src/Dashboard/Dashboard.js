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

const ingredientList = ['bread', 'meats', 'vegetables', 'sauces', 'cheeses']

class Dashboard extends Component {
  state = {
    bread: false,
    meats: false,
    vegetables: false,
    sauces: false,
    cheeses: false,
  }

  handleExpandChange = name => this.setState({ [name]: !this.state[name] })
  closeAllExpanded = name => this.setState({ [name]: false })
  handleCreate = () => {
    ingredientList.forEach(i => this.closeAllExpanded(i))
    this.props.actions.createOrder(shortId().new())
  }


  render() {
    const {
      orders,
      actions: {
        changeMenu,
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
              expanded={this.state[ingredient]}
              onExpandChange={this.handleExpandChange}
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
            onClick={this.handleCreate}
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
