import { MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  getEstatePosition,
  getRealEstate
} from './Database'
import Map from './Map'
import CustomMarker from './CustomMarker'
import DefaultMarker from './DefaultMarker'
import displayMarkers from './displayMarkers'

function initMap() {
  // * Initialize Map
  const map = Map(document.getElementById('map'))

  // * Real Estate Data
  const estateData = getRealEstate()
  
  // * Custom Markers with HTML
  const markers = estateData.map(estate => CustomMarker({
    id: estate.internal_id,
    map,
    data: estate,
    htmlContent: estate.formatted_usd_price,
    AdvancedMarkerView: google.maps.marker.AdvancedMarkerView
  }))

  // * Default Markers for Create Clusters
  const defaultMarkers = estateData.map(estate => DefaultMarker({
    map,
    Marker: google.maps.Marker,
    position: getEstatePosition(estate),
    isVisible: false
  }))

  // * Clusterer
  new MarkerClusterer({
    markers: defaultMarkers,
    map
  })

  // * Interactive Display Markers when move screen or zoom.
  map.addListener('center_changed', () => {
    // * Added a setTimeout wait for interpolation ends.
    setTimeout(() => {
      displayMarkers({ markers, defaultMarkers, map })
    }, 500)
  })

  map.addListener('tilesloaded', () => {
    // * Call displayMarkers for first time and each time tileset load.
    displayMarkers({ markers, defaultMarkers, map })
  })
}

window.initMap = initMap
