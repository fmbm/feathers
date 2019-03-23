import React, { useState, useCallback } from "react"
import SearchBox from "../SearchBox"
import SelectedItem from "./SelectedItem"

export default ({
  onClick,
  onClear,
  attribute,
  serviceName,
  params,
  emptySearchResults,
  onChangeResults
}) => {
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState([])

  /*
    Toggle item from selected list
  */
  const toggleSelected = useCallback(v =>
    setSelected(curSelected => {
      let alreadySelected = curSelected[v.id]
      let newSelected = Object.assign({}, curSelected, { [v.id]: v })

      if (alreadySelected) delete newSelected[v.id]

      return newSelected
    })
  )

  const onChangeResultsEnhanced = r => {
    onChangeResults(r)
    setResults(r)
  }

  const itemsSelected = Object.values(selected).length > 0

  return (
    <React.Fragment>
      {itemsSelected &&
        Object.values(selected).map(item => {
          const onClearEnhanced = e => {
            toggleSelected(item)
            setResults()
            onClear && onClear(e, item)
          }
          return (
            <SelectedItem
              key={`ac-si-${item.id}`}
              item={item}
              attribute={attribute}
              onClear={onClearEnhanced}
            />
          )
        })}
      {!itemsSelected && (
        <SearchBox
          attribute={attribute}
          serviceName={serviceName}
          params={params}
          onChangeResults={onChangeResultsEnhanced}
          emptySearchResults={emptySearchResults}
        />
      )}
      {!itemsSelected && results && (
        <ul>
          {results.map(r => {
            const onClickEnhanced = e => {
              toggleSelected(r)
              onClick && onClick(e, r)
            }
            return (
              <li onClick={onClickEnhanced} key={`ac-li-r${r.id}`}>
                {r[attribute]}
              </li>
            )
          })}
        </ul>
      )}
    </React.Fragment>
  )
}
