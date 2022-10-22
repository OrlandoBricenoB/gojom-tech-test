import { pick } from 'lodash'
import * as gojomData from '../data/gojom-data.json'

export const getCentralGeoPoint = () => {
  const centralGeoPoint = gojomData.central_geo_point
  return {
    lat: centralGeoPoint.latitude || 0,
    lng: centralGeoPoint.longitude || 0
  }
}

export const getRestrictGeoBoundingBox = () => {
  const geoBoundingBox = gojomData.geo_bounding_box
  const restriction = {}

  // * Latitude from Left to Right.
  restriction.north = geoBoundingBox.top_left.latitude
  restriction.south = geoBoundingBox.bottom_right.latitude

  // * Longitude from Left to Right.
  restriction.west = geoBoundingBox.top_left.longitude
  restriction.east = geoBoundingBox.bottom_right.longitude

  return {
    latLngBounds: restriction,
    strictBounds: false
  }
}

export const getRealEstate = () => {
  return gojomData.properties.map(property => ({
    ...property.location,
    ...pick(property, [
      'title', 
      'internal_id', 
      'formatted_usd_price',
      'bathrooms',
      'bedrooms',
      'build_area',
      'garages',
      'property_type',
      'image'
    ])
  }))
}

export const getEstatePosition = estate => ({
  lat: estate?.latitude,
  lng: estate?.longitude
})
