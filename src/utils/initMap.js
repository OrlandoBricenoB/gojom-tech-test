import { MarkerClusterer } from '@googlemaps/markerclusterer'
import {
  getEstatePosition,
  getRealEstate
} from './Database'
import Map from './Map'
import CustomMarker from './CustomMarker'
import DefaultMarker from './DefaultMarker'
import displayMarkers from './displayMarkers'
import observer from './Observer'

// * Global 
window.estateTypes = ['alquilar', 'comprar']

function initMap() {
  // * Initialize Map
  const map = Map(document.getElementById('map'))

  // * Get Real Estate Data.
  const estateData = getRealEstate()

  // * Initialize Markers.
  const initializeMarkers = () => {
    // * Filter markers for initialize.
    const filteredRealEstate = estateData.filter(estate => {
      return estateTypes.includes(estate.operation_type)
    })

    // * Custom Markers with HTML
    const markers = filteredRealEstate.map(estate => CustomMarker({
      id: estate.internal_id,
      map,
      data: estate,
      htmlContent: estate.formatted_usd_price,
      AdvancedMarkerView: google.maps.marker.AdvancedMarkerView
    }))
  
    // * Default Markers for Create Clusters
    const defaultMarkers = filteredRealEstate.map(estate => DefaultMarker({
      internal_id: estate.internal_id,
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

    // ? Wait for map construction.
    setTimeout(() => {
      displayMarkers({ markers, defaultMarkers, map })
    }, 500)

    return [markers, defaultMarkers]
  }

  // * Create markers with Real Estate Data.
  const [
    markers,
    defaultMarkers,
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
