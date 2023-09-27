import toast from "react-hot-toast";

export const setPlaylistLocalStorage = (currentData, statePlaylistData) => {
  let isLocalStorageData = true;
  if (currentData && statePlaylistData.length >= 0) {
    // get playlist from localstorage
    const previousLocalData = JSON.parse(localStorage.getItem("data"));

    // check if playlist is already in the localstorage
    if (previousLocalData && previousLocalData.data) {
      const findForLocalStorageConflict = previousLocalData.data.find(
        (id) => id.etag === currentData.etag
      );

      // if the playlist is already in the localstorage then return
      if (findForLocalStorageConflict) {
        toast.error("Already in the Playlist");
        console.log("Already in the local storage");

        return (isLocalStorageData = false);
      } else {
        toast.success("Added to Playlist");
        // if the playlist is not in the localstorage then add it to the localstorage
        localStorage.setItem(
          "data",
          JSON.stringify({
            data: [...previousLocalData.data, currentData],
          })
        );
      }
    }
  }
  return isLocalStorageData;
};
