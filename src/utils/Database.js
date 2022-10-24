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

  // ? 0.01 for offset, the original bounding made it look bad.

  // * Latitude from Left to Right.
  restriction.north = geoBoundingBox.top_left.latitude + 0.01
  restriction.south = geoBoundingBox.bottom_right.latitude - 0.01

  // * Longitude from Left to Right.
  restriction.west = geoBoundingBox.top_left.longitude - 0.01
  restriction.east = geoBoundingBox.bottom_right.longitude + 0.01

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
      'usd_price',
      'bathrooms',
      'bedrooms',
      'image',
      'build_area',
      'total_area',
      'garages',
      'operation_type',
      'property_type',
      'image'
    ])
  }))
}

export const getEstatePosition = estate => ({
  lat: estate?.latitude,
  lng: estate?.longitude
})

export const getEstateOne = (id) => {
  return gojomData.properties.find(property => property.internal_id === id)
}
