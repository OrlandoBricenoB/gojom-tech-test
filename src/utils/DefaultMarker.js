const DefaultMarker = ({
  internal_id: id,
  map,
  Marker,
  position,
  isVisible
}) => {
  // * Invisible Marker SVG
  const svgMarker = {
    path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
    fillOpacity: 0,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30)
  }

  const marker = new Marker({
    map,
    position,
    icon: isVisible ? null : svgMarker
  })

  marker.internal_id = id

  window.defaultMarkerList.push(marker)

  return marker
}

export default DefaultMarker
