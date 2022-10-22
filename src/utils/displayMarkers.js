const displayMarkers = ({ markers, defaultMarkers, map }) => {
  markers.forEach(marker => {
    const markerPosition = {
      lat: marker.ba.lat,
      lng: marker.ba.lng
    }

    const defaultMarker = defaultMarkers.find(defaultMarker => {
      return defaultMarker.position.lat() === markerPosition.lat && defaultMarker.position.lng() === markerPosition.lng
    })

    // * Display CustomMarker if defaultMarker is visible.
    marker.map = defaultMarker.map ? map : null
  })
}

export default displayMarkers
