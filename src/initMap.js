import { MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  getEstatePosition,
  getRealEstate
} from './api/Database'
import Map from './components/Map'
import CustomMarker from './components/CustomMarker'
import DefaultMarker from './components/DefaultMarker'
import displayMarkers from './utils/displayMarkers'
import observer from './api/Observer'

// * Global
window.estateTypes = ['alquilar', 'comprar']

function initMap () {
  // * Initialize Map
  const map = Map(document.getElementById('map'))

  // * Get Real Estate Data.
  const estateData = getRealEstate()

  // * Initialize Markers.
  const initializeMarkers = () => {
    // * Filter markers for initialize.
    const filteredRealEstate = estateData.filter(estate => {
      return window.estateTypes.includes(estate.operation_type)
    })

    // * Custom Markers with HTML
    const markers = filteredRealEstate.map(estate => CustomMarker({
      id: estate.internal_id,
      map,
      data: estate,
      htmlContent: estate.formatted_usd_price,
      AdvancedMarkerView: window.google.maps.marker.AdvancedMarkerView
    }))

    // * Default Markers for Create Clusters
    const defaultMarkers = filteredRealEstate.map(estate => DefaultMarker({
      internal_id: estate.internal_id,
      map,
      Marker: window.google.maps.Marker,
      position: getEstatePosition(estate),
      isVisible: false
    }))
    window.markersIDList = defaultMarkers.map(marker => marker.internal_id)

    // * Clusterer
    const cluster = new MarkerClusterer({
      markers: defaultMarkers,
      map
    })

    // ? Wait for map construction.
    setTimeout(() => {
      displayMarkers({ markers, defaultMarkers, map })
    }, 500)

    return [markers, defaultMarkers, cluster]
  }

  // * Create markers with Real Estate Data.
  const [
    markers,
    defaultMarkers
  ] = initializeMarkers()

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

  // * Register observer.
  observer.subscribe({
    name: 'estateTypes',
    callback: () => {
      // * Reinitialize maps.
      initMap()
    }
  })
}

window.initMap = initMap
