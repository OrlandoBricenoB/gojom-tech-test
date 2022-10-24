const displayMarkers = ({ markers, defaultMarkers, map }) => {
  markers.forEach(marker => {
    const defaultMarker = defaultMarkers.find(defaultMarker => {
      return defaultMarker.internal_id === marker.internal_id
    })

    // * Display CustomMarker if defaultMarker is visible.
    marker.map = defaultMarker?.map ? map : null
  })
}

export default displayMarkers
