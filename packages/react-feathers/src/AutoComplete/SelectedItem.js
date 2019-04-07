import React from 'react'
import PropTypes from 'prop-types'

function Selected({ item, attribute, onClear }) {
  return (
    <div>
      {item[attribute]} <button onClick={onClear}>x</button>
    </div>
  )
}

Selected.propTypes = {
  onClear: PropTypes.func,
  attribute: PropTypes.string,
  item: PropTypes.object
}

export default Selected
