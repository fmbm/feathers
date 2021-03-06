import React, { useState } from "react"
import './style.css'

import {
  Dropdown,
  FeathersProvider,
  InfiniteList,
  AutoComplete,
  SearchBox,
  List
} from "@fmbm/react-feathers"
import feathers from "./feathers"

export default () => {
  const onChange = (e, v) => console.log(v)
  const onChangeResults = r => console.log(r)
  const onError = e => window.alert(e.toString())
  const [ limit, setLimit ] = useState(10)

  return (
    <FeathersProvider value={feathers}>
      <Dropdown
        onChange={onChange}
        attribute={process.env.REACT_APP_ATTRIBUTE}
        serviceName={process.env.REACT_APP_SERVICE_NAME}
        params={{
          query: {
            $limit: 100,
            [process.env.REACT_APP_ATTRIBUTE]: { $like: "A%" },
            $sort: { [process.env.REACT_APP_ATTRIBUTE]: 1 }
          }
        }}
      />
      <SearchBox
        serviceName={process.env.REACT_APP_SERVICE_NAME}
        onChangeResults={onChangeResults}
        attribute={process.env.REACT_APP_ATTRIBUTE}
        onError={onError}
      />
      <AutoComplete
        serviceName={process.env.REACT_APP_SERVICE_NAME}
        onChangeResults={onChangeResults}
        attribute={process.env.REACT_APP_ATTRIBUTE}
      />
      <List
        serviceName={process.env.REACT_APP_SERVICE_NAME}
        params={{
          query: {
            $limit: 2,
            [process.env.REACT_APP_ATTRIBUTE]: { $like: process.env.REACT_APP_LIST_SEARCH },
            $sort: { id: -1 }
          }
        }}
        renderRow={row => (
          <div key={row.id}>{row[process.env.REACT_APP_ATTRIBUTE]}</div>
        )}
      />
      <h1>{"<InfiniteList />"}</h1>
      Limit (per load) <input value={limit} onChange={e => setLimit(e.target.value)} />
      <div className="infinite_list">
        <InfiniteList 
          serviceName={process.env.REACT_APP_SERVICE_NAME}
          params={{
            query: {
              $limit: limit,
              $sort: { id: -1 }
            }
          }}
          renderRow={row => 
            <div className="infinite_list__item" key={row.id}>
              {row.id}<br />
              {row[process.env.REACT_APP_ATTRIBUTE]}
            </div>
          } 
          renderEmpty={() => <div>Nothing to see here</div>}
        />
      </div>
    </FeathersProvider>
  )
}
