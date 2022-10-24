import { getCentralGeoPoint, getRestrictGeoBoundingBox } from './Database'

const Map = mapEl => {
  const centralGeoPoint = getCentralGeoPoint()
  const restrictGeoBoundingBox = getRestrictGeoBoundingBox()

  return new window.google.maps.Map(mapEl, {
    zoom: 10,
    center: centralGeoPoint,
    restriction: restrictGeoBoundingBox,
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    mapId: '4504f8b37365c3d0'
  })
}

export default Map
