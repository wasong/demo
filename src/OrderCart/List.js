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
              }, index) => (
                <LIST key={orderId}>
                  <Divider />
                  <span style={{ color: 'blue' }}> Order No.{index + 1} </span>
                  <ListItem
                    primaryText="Breads"
                    nestedItems={bread ? [
                      <ListItem
                        key={1}
                        primaryText={bread[0].toUpperCase().concat(bread.substring(1))}
                      />,
                    ] : []}
                  />
                  <ListItem
                    primaryText="Vetgetables"
                    nestedItems={
                      this.printList('vegetables', vegetables).map((item, index) => (
                        <ListItem
                          key={index}
                          primaryText={item}
                        />
                      ))}
                  />
                  <ListItem
                    primaryText="Cheeses"
                    nestedItems={
                      this.printList('cheeses', cheeses).map((item, index) => (
                        <ListItem
                          key={index}
                          primaryText={item}
                        />
                      ))}
                  />
                  <ListItem
                    primaryText="Meats"
                    nestedItems={
                      this.printList('meats', meats).map((item, index) => (
                        <ListItem
                          key={index}
                          primaryText={item}
                        />
                      ))}
                  />
                  <ListItem
                    primaryText="Sauces"
                    nestedItems={
                      this.printList('sauces', sauces).map((item, index) => (
                        <ListItem
                          key={index}
                          primaryText={item}
                        />
                      ))}
                  />
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
