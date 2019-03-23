import { useCallback } from "react"
import useApi from "./hooks/useApi"

const List = ({ serviceName, params, renderRow }) => {
  const { response } = useApi({ serviceName, params })

  const renderRows = useCallback(
    data => {
      return data.map(row => renderRow(row))
    },
    [response]
  )

  if (!(response && response.data)) return null

  return renderRows(response.data)
}

export default List
