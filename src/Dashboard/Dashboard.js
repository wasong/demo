import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Radium from 'radium'

import Selections from './Selections'
import { actions as dashboardActions } from './dashboard.module'

const selections = [
  {
    title: 'Bread',
    ingredient: 'bread',
    subtitle: 'Choose your preferred bread',
    types: [
      {
        label: 'White',
        value: 'white',
      },
      {
        label: 'Rye',
        value: 'rye',
      },
      {
        label: 'Whole Wheat',
        value: 'wholeWheat',
      },
    ],
  },
  {
    title: 'Vegetables',
    ingredient: 'vegetables',
    subtitle: 'Choose your vegetables',
    types: [
      {
        label: 'Lettuce',
        value: 'lettuce',
      },
      {
        label: 'Tomatos',
        value: 'tomato',
      },
      {
        label: 'Olives',
        value: 'olive',
      },
      {
        label: 'Banana Peppers',
        value: 'bananaPepper',
      },
    ],
  },
  {
    title: 'Meat',
    ingredient: 'meat',
    subtitle: 'Choose your meat',
    types: [
      {
        label: 'Ham',
        value: 'ham',
      },
      {
        label: 'Sausage',
        value: 'sausage',
      },
      {
        label: 'Turkey',
        value: 'turkey',
      },
      {
        label: 'Salmon',
        value: 'salmon',
      },
    ],
  },
]

class Dashboard extends Component {
  state = {}

  render() {
    const {
      orders,
      actions: {
        changeMenu,
      },
    } = this.props
    return (
      <div>
        {
          selections.map(({
            title,
            subtitle,
            ingredient,
            types,
          }) => (
            <Selections
              items={orders.vegetables.length ? [...orders.vegetables, ...Object.values(orders)].filter(item => !Array.isArray(item)) : Object.values(orders).filter(item => !Array.isArray(item))}
              onChange={changeMenu}
              ingredient={ingredient}
              key={title}
              title={title}
              subtitle={subtitle}
              types={types}
            />
          ))
        }
      </div>
    )
  }
}

Dashboard.propTypes = {}
Dashboard.defaultProps = {}

const mapStateToProps = ({ dashboard }) => ({
  ...dashboard,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dashboardActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Dashboard))
