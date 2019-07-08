import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useFormInput from './hooks/useFormInput'
import useDebounce from './hooks/useDebounce'
import useApi from './hooks/useApi'

function SearchBox({
  attribute,
  serviceName,
  component: Component,
  params = {},
  mergeParams = true,
  onChangeResults,
  emptySearchResults = false
}) {
  const [query, setQuery] = useState(emptySearchResults)
  const [apiParams, setApiParams] = useState(params)
  const debouncedQuery = useDebounce(query, 200)

  // Merge params w/previous params
  const mergeQueryParams = newParams => {
    if (mergeParams)
      return setApiParams(prevParams => ({
        ...prevParams,
        query: {
          ...prevParams.query,
          ...newParams.query
        }
      }))

    return setApiParams(newParams)
  }

  // API call
  const { loading, response, error } = useApi(
    {
      serviceName,
      params: apiParams
    },
    debouncedQuery !== false
  )
  if (error) throw error
  const results =
    (debouncedQuery || emptySearchResults) && response && response.data

  // Update params for searching
  useEffect(() => {
    // Only fire if we have a string (prevents unnecessary API calls on first render)
    // Also verify there's an actual query, unless we allow empty results
    if (
      typeof debouncedQuery === "string" &&
      (emptySearchResults || debouncedQuery.length)
    )
      mergeQueryParams({
        query: { [attribute]: { $like: `%${debouncedQuery}%` } }
      })
  }, [debouncedQuery])

  // Update field value
  const input = useFormInput('', v => {
    setQuery(v)
  })

  // Fire callback w/results
  useEffect(() => {
    if (onChangeResults) onChangeResults(results)
  }, [results])

  return (
    <div>
      <Component type="text" {...input} />
      {loading && <span>loading</span>}
    </div>
  )
}

SearchBox.propTypes = {
  attribute: PropTypes.string,
  serviceName: PropTypes.string,
  params: PropTypes.object,
  emptySearchResults: PropTypes.func,
  onChangeResults: PropTypes.func,
  component: PropTypes.elementType
}

SearchBox.defaultProps = {
  component: 'input'
}

export default SearchBox
