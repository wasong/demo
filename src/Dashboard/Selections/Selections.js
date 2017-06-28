import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  types: {
    margin: '0 12px 0 0',
  },
}

const Selections = ({
  title,
  subtitle,
  ingredient,
  types,
  onChange,
  items,
}) => (
  <Card>
    <CardHeader
      title={title}
      subtitle={subtitle}
      actAsExpander
      showExpandableButton
    />
    <CardText expandable>
      {
        types.map(({ label, value }) => (
          <RaisedButton
            key={value}
            onClick={() => onChange(ingredient, value)}
            label={label}
            style={styles.types}
            backgroundColor={items.includes(value) ? '#93DB78' : '#FFFFFF'}
            labelStyle={{ 'text-transform': 'initial' }}
          />
        ))
      }
    </CardText>
  </Card>
)
Selections.propTypes = {}
Selections.defaultProps = {}

export default Radium(Selections)
