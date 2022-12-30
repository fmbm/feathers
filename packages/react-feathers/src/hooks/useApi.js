import { useEffect, useContext, useState, useDebugValue } from "react"
import FeathersContext from "../FeathersContext"

/**
 * @typedef UseAPIConfig
 * @type {object}
 * @property {string} serviceName - Name of the feathers service
 * @property {object} params - Params to find to service.find()
 * @property {function} onError - Callback for when an error occurs
 */


/**
 * @typedef UseAPIResponse
 * @type {object}
 * @property {object} response - Feathers response
 * @property {boolean} loading - Loading state
 * @property {error} error - Feathers service error
 */

/**
 * Access the Feathers API directly, via a specific service
 *
 * @param {UseAPIConfig} config
 * @param {boolean} ready
 * 
 * @returns {}
 */
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
