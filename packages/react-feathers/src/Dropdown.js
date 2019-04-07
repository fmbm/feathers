import React from 'react'
import PropTypes from 'prop-types'
import useApi from './hooks/useApi'

function Dropdown({ onChange, attribute, serviceName, params }) {
  const { loading, response, error } = useApi({ serviceName, params })
  let options
  let onChangeEnhanced = onChange

  if (loading) return <div>--loading--</div>
  if (error) throw error

  if (response && response.data) {
    onChangeEnhanced = e => onChange(e, response.data[e.target.value])

    options = response.data.map((v, i) => {
      return (
        <option key={v.id} value={i}>
          {v[attribute]}
        </option>
      )
    })
  }

  return <select onChange={onChangeEnhanced}>{options}</select>
}

Dropdown.propTypes = {
  onChange: PropTypes.func,
  attribute: PropTypes.string,
  serviceName: PropTypes.string,
  params: PropTypes.object
}

export default Dropdown
