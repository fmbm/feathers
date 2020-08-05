import React, { useCallback, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import useApi from "./hooks/useApi";

function InfiniteList({
  serviceName,
  params,
  renderRow,
  renderEmpty: RenderEmpty,
  initialResults = [],
  onLoadMore,
}) {
  const [apiParams, setApiParams] = useState(params);
  const { response, loading } = useApi({ serviceName, params: apiParams }, true, true);
  const [results, setResults] = useState(initialResults);

  // Render rows, using prop given
  const renderRows = useCallback(
    (data) => {
      return data.map((row) => renderRow(row));
    },
    [params]
  );

  // Since we update params when Waypoint is triggered, this causes a re-render
  // Which in-turn causes useAPI to run again, since useAPI re-runs whenever params are updated
  // Once useAPI has a response for us, this is triggered, assuming the response has changed
  // All allowing for a smooth af infinite load
  useEffect(() => {
    // Merge previous data with new data, if we have any
    if (response && response.data) {
      setResults((previousResults) => [...previousResults, ...response.data]);
    }
  }, [response]);

  // Once Waypoint is triggered, we update params, which triggers the effect above
  function onEnter(e) {
    onLoadMore && onLoadMore(e);
    setApiParams((prevParams) => {
      const offset = parseInt(prevParams.query.$skip || 0) + 10;
      return {
        ...prevParams,
        ...{
          query: {
            ...prevParams.query,
            $skip: offset,
          },
        },
      };
    });
  }

  // Return empty only if we've already pinged the API and have no results
  // The reason this is not straight forward is because of the re-renders that take place 
  // While fetching data. There's a moment where useApi has a results, but is still marked as loading
  // Since this happens in 2 separate updates (first we get results, then we say we're no longer loading)
  // Furthermore, there is a point (once we've scrolled all the way) where our response won't have data
  // But our overall results (we fetched previously) will
  // So, to be sure we truly have empty results, we do all this shit
  // Its also possible i've been staring at this for too long
  const emptyResults = !loading && !!response && !response.data.length && !results.length 
  if(emptyResults) return RenderEmpty ? <RenderEmpty /> : null;

  // Don't return shit if we dont have shit
  if (!results.length) return null;

  // Now we can return shit
  return (
    <>
      {renderRows(results)}
      <Waypoint onEnter={onEnter} />
    </>
  );
}

export default InfiniteList;
