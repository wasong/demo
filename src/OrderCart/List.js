import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Radium from 'radium'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import { List as LIST, ListItem } from 'material-ui/List'
import data from '../Dashboard/data'
import { actions } from '../Dashboard/dashboard.module'

const styles = {
  root: {
    position: 'absolute',
    right: 40,
    bottom: 50,
  },
  display: {
    display: 'none',
  },
}

class List extends Component {
  state = {}

  findLabel = (name, value) => (data.find(i => i.ingredient === name).types.find(type => type.value === value)).label
  printList = (name, list) => list.map(item => <span key={item}>{this.findLabel(name, item)}&nbsp;</span>)

  render() {
    const {
      created,
      open,
    } = this.props

    return (
      <div style={[styles.root, open ? null : styles.display]}>
        <Card>
          <CardHeader
            title="Orders"
          />
          <CardText>
            {
              created.map(({
                  orderId,
                  bread,
                  vegetables,
                  cheeses,
                  meats,
                  sauces,
              }) => (
                <LIST key={orderId}>
                  <Divider />
                  <ListItem primaryText={bread ? bread[0].toUpperCase().concat(bread.substring(1)) : bread} />
                  <ListItem primaryText={this.printList('vegetables', vegetables)} />
                  <ListItem primaryText={this.printList('cheeses', cheeses)} />
                  <ListItem primaryText={this.printList('meats', meats)} />
                  <ListItem primaryText={this.printList('sauces', sauces)} />
                </LIST>
              ))
            }
          </CardText>
        </Card>
      </div>
    )
  }
}

List.propTypes = {
  created: PropTypes.arrayOf(PropTypes.object),
}
List.defaultProps = {
  created: [],
}

const mapStateToProps = ({ dashboard }) => ({
  created: dashboard.created,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(List))
