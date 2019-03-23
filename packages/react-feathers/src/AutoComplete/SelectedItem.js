import React from "react"

const Selected = ({ item, attribute, onClear }) => {
  return (
    <div>
      {item[attribute]} <button onClick={onClear}>x</button>
    </div>
  )
}

export default Selected
