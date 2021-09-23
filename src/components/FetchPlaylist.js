import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import axios from "axios";
import DispList from "./DispList";

const FetchPlaylist = () => {
  const [pageToken, setPageToken] = useState();
  const KEY = process.env.REACT_APP_HOST_API_KEY;
  const fetchPlaylist = async (key, pageToken) => {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          playlistId: "PLQEUs9xtYT6o8QYY-NYg5hRuX-8fLrcy3",
          key: KEY,
          maxResults: 6,
          pageToken: pageToken,
        },
      }
    );
    return data;
  };
  const { resolvedData, isLoading, error } = usePaginatedQuery(
    ["playlist", pageToken],
    fetchPlaylist
  );
  return (
    <div className="container">
      <h5>🍟 Playlist Trap Music 🥤</h5>
      {error && <div> Ops, Something happining in here :( </div>}

      {isLoading ? (
        <div> Loading Playlist... </div>
      ) : (
        <>
          <button
            className="btn"
            onClick={() => setPageToken(resolvedData.prevPageToken)}
            disabled={!resolvedData.prevPageToken}
          >
            ◀
          </button>
          <button
            className="btn"
            onClick={() => setPageToken(resolvedData.nextPageToken)}
            disabled={!resolvedData.nextPageToken}
          >
            ▶
          </button>
          <DispList resolvedData={resolvedData} />
        </>
      )}
    </div>
  );
};

export default FetchPlaylist;
