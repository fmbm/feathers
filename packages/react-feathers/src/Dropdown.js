import React from "react"
import useApi from "./hooks/useApi"

export default ({ onChange, attribute, serviceName, params }) => {
  const { loading, response, error } = useApi({ serviceName, params })
  let options,
    onChangeEnhanced = onChange

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
