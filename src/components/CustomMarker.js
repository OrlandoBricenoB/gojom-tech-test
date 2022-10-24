import cleanCharacteristicValue from '../utils/cleanCharacteristicValue'
import { getEstatePosition } from '../api/Database'
import observer from '../api/Observer'

const CustomMarker = ({
  id,
  map,
  data,
  htmlContent,
  AdvancedMarkerView
}) => {
  const {
    title,
    image,
    bedrooms,
    address,
    bathrooms,
    total_area: totalArea
  } = data

  const popupContainer = document.createElement('div')

  const informationEl = document.createElement('div')
  informationEl.classList.value = 'flex items-center gap-2 p-2 bg-white rounded-lg markerInformation'
  informationEl.innerHTML =
  `<div>
    <img
      width="64"
      height="64"
      src="${image}" 
    />
  </div>
  <div class="overflow-hidden">
    <p class="font-bold whitespace-nowrap text-ellipsis overflow-hidden">${title}</p>
    ${address ? `<p class="text-xs text-gray-500">${address}</p>` : ''}
    <div class="flex flex-wrap items-center gap-x-2 text-xs">
      ${bedrooms
      ? `<div class="flex items-center gap-1 svg-small">
          <i class="fas fa-bed"></i>
          <p>
            ${cleanCharacteristicValue('bedrooms', bedrooms)}
          </p>
        </div>`
      : ''}
      ${bathrooms
      ? `<div class="flex items-center gap-1 svg-small">
          <i class="fas fa-bath"></i>
          <p>
            ${cleanCharacteristicValue('bathrooms', bathrooms)}
          </p>
        </div>`
      : ''}
      ${totalArea
      ? `<div class="flex items-center gap-1 svg-small">
          <i class="fas fa-ruler-combined"></i>
          <p>
            ${cleanCharacteristicValue('total_area', totalArea)}
          </p>
        </div>`
      : ''}
    </div>
  </div>`

  const popupEl = document.createElement('div')
  popupEl.classList.add('markerContainer')
  popupEl.setAttribute('id', id)
  popupEl.innerHTML = htmlContent

  const onHover = () => {
    const offsetParent = popupEl.offsetParent
    offsetParent.classList.add('z-20')
    informationEl.classList.add('markerInformation--open')
  }

  const onBlur = () => {
    const offsetParent = popupEl.offsetParent
    offsetParent.classList.remove('z-20')
    informationEl.classList.remove('markerInformation--open')
  }

  const onClick = () => {
    observer.notify('drawer', {
      status: true,
      data: { id }
    })
  }

  popupEl.addEventListener('mouseenter', onHover)
  popupEl.addEventListener('mouseleave', onBlur)
  popupEl.addEventListener('mousedown', onClick)
  popupEl.addEventListener('touchend', onClick)

  popupContainer.appendChild(popupEl)
  popupContainer.appendChild(informationEl)

  const marker = new AdvancedMarkerView({
    map,
    position: getEstatePosition(data),
    content: popupContainer
  })

  marker.internal_id = id
  return marker
}

export default CustomMarker
