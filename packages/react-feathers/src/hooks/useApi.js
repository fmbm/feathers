import { useEffect, useContext, useState, useDebugValue } from "react"
import FeathersContext from "../FeathersContext"

function useApi({ serviceName, params }, ready = true) {
  const feathers = useContext(FeathersContext)

  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useDebugValue("Hello")

  useEffect(
    () => {
      if (!!ready) {
        try {
          feathers
            .service(serviceName)
            .find(params)
            .then(response => setResponse(response))
            .finally(setLoading(false))
        } catch (e) {
          console.error("got an error", e)
          setError(e)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    },
    [params]
  )

  return { response, loading, error }
}

export default useApi
