import { useEffect, useContext, useState, useDebugValue } from "react"
import FeathersContext from "../FeathersContext"

function useApi({ serviceName, params, onError }, ready = true) {
  const feathers = useContext(FeathersContext)

  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useDebugValue("Hello")

  useEffect(() => {
    if (ready) {
      try {
        feathers
          .service(serviceName)
          .find(params)
          .then(response => setResponse(response))
          .catch(err => {
            if (onError) onError(err)
            console.error("Error calling Feathers API:", err) // eslint-disable-line no-console
            return Promise.reject(err)
          })
          .finally(setLoading(false))
      } catch (e) {
        console.error("Call to Feathers API threw an error:", e) // eslint-disable-line no-console
        setError(e)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [params])

  return { response, loading, error }
}

export default useApi
