const getPlaylistItems = async (playlistId, pageToken = "", result = []) => {
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${
    import.meta.env.VITE_api_key
  }&pageToken=${pageToken}&maxResults=50`;

  const res = await fetch(url);
  const data = await res.json();

  result = [...data.items, ...result];

  if (data.nextPageToken) {
    return (result = await getPlaylistItems(
      playlistId,
      data.nextPageToken,
      result
    ));
  }

  return [data.pageInfo, result];
};

const getPlaylistInfo = async (playlistId) => {
  const url = `https://youtube.googleapis.com/youtube/v3/playlists?id=${playlistId}&part=snippet&key=${
    import.meta.env.VITE_api_key
  }`;
  const res = await fetch(url);
  const data = await res.json();

  const [pageInfo, playlistVideos] = await getPlaylistItems(playlistId);

  const result = await {
    ...data,
    pageInfo: pageInfo,
    playlistId: playlistId,
    firstVideoInfo: { ...playlistVideos[0].snippet.resourceId },
  };

  return result;
};

const getCommentsThreads = async (videoId) => {
  const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${
    import.meta.env.VITE_api_key
  }`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export { getPlaylistInfo, getPlaylistItems, getCommentsThreads };
