import React from 'react'
import PropTypes from 'prop-types'

function Selected({ component: Component, item, attribute, onClear }) {
  if (Component) {
    return <Component onClear={onClear} item={item} value={item[attribute]} />
  }
  return (
    <div>
      {item[attribute]} <button onClick={onClear}>x</button>
    </div>
  )
}

Selected.propTypes = {
  component: PropTypes.elementType,
  onClear: PropTypes.func,
  attribute: PropTypes.string,
  item: PropTypes.object
}

export default Selected
