import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Radium from 'radium'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { actions } from ''

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
              created.map((i) => {
                console.log(i)
                return <span />
              })
            }
          </CardText>
        </Card>
      </div>
    )
  }
}

List.propTypes = {}
List.defaultProps = {}

const mapStateToProps = ({ dashboard }) => ({
  created: dashboard.created,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Radium(List))
