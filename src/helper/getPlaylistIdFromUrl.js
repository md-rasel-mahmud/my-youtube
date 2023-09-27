export const getPlaylistIdFromUrl = (link) => {
  const url = new URL(link);
  // Parse the URL

  // Get the query parameters
  const queryParams = new URLSearchParams(url.search);

  // Get the playlist ID from the "list" parameter
  const playlistId = queryParams.get("list");

  return playlistId;
};
