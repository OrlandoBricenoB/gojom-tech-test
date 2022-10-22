import { getEstatePosition } from './Database'

const CustomMarker = ({
  id,
  map,
  data,
  htmlContent,
  AdvancedMarkerView
}) => {
  const popupEl = document.createElement('div')
  popupEl.classList.add('popupContainer')
  popupEl.setAttribute('id', id)
  popupEl.innerHTML = htmlContent

  const marker = new AdvancedMarkerView({
    map,
    position: getEstatePosition(data),
    content: popupEl
  })

  return marker
}

export default CustomMarker
