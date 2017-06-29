import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  types: {
    margin: '0 12px 12px 0',
  },
  label: {
    textTransform: 'initial',
  },
}

const handleSelectionType = (selectedTypes, value) => {
  if (Array.isArray(selectedTypes)) return !!selectedTypes.find(t => t === value)
  return selectedTypes === value
}

const Selections = ({
  title,
  subtitle,
  ingredient,
  types,
  onChange,
  selectedTypes,
  expanded,
  onExpandChange,
}) => (
  <Card expanded={expanded} onExpandChange={() => onExpandChange(ingredient)}>
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
            labelStyle={styles.label}
            primary={handleSelectionType(selectedTypes, value)}
          />
        ))
      }
    </CardText>
  </Card>
)
Selections.propTypes = {}
Selections.defaultProps = {}

export default Radium(Selections)
