import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import SearchBox from '../SearchBox'
import SelectedItem from './SelectedItem'

function AutoComplete({
  onClick,
  onClear,
  attribute,
  serviceName,
  fieldComponent,
  resultComponent: ResultComponent,
  selectedItemComponent,
  params,
  emptySearchResults,
  onChangeResults
}) {
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState([])

  /*
    Toggle item from selected list
  */
  const toggleSelected = useCallback(
    v =>
      setSelected(curSelected => {
        let alreadySelected = curSelected[v.id]
        let newSelected = Object.assign({}, curSelected, { [v.id]: v })

        if (alreadySelected) delete newSelected[v.id]

        return newSelected
      }),
    []
  )

  const onChangeResultsEnhanced = r => {
    onChangeResults(r)
    setResults(r)
  }

  const itemsSelected = Object.values(selected).length > 0

  return (
    <React.Fragment>
      <SearchBox
        attribute={attribute}
        serviceName={serviceName}
        component={fieldComponent}
        params={params}
        onChangeResults={onChangeResultsEnhanced}
        emptySearchResults={emptySearchResults}
      />
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
              component={selectedItemComponent}
              onClear={onClearEnhanced}
            />
          )
        })}
      {!itemsSelected && results && (
        <ul>
          {results.map(r => {
            const onClickEnhanced = e => {
              toggleSelected(r)
              onClick && onClick(e, r)
            }
            return (
              <ResultComponent onClick={onClickEnhanced} key={`ac-li-r${r.id}`}>
                {r[attribute]}
              </ResultComponent>
            )
          })}
        </ul>
      )}
    </React.Fragment>
  )
}

AutoComplete.propTypes = {
  onClick: PropTypes.func,
  onClear: PropTypes.func,
  emptySearchResults: PropTypes.func,
  onChangeResults: PropTypes.func,
  attribute: PropTypes.string,
  serviceName: PropTypes.string,
  params: PropTypes.object,
  selectedItemComponent: PropTypes.elementType,
  fieldComponent: PropTypes.elementType,
  resultComponent: PropTypes.elementType
}

AutoComplete.defaultProps = {
  resultComponent: 'li'
}

export default AutoComplete
