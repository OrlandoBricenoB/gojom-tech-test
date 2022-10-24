import { characteristicsMap, displayCharacteristicMinify } from './estateCharacteristic'

const DrawerList = estateList => {
  const drawerHeader =
  `<!-- Drawer Close -->
  <div class="flex items-center justify-between mb-3">
    <p class="text-gray-500 m-0">Se encontraron ${estateList.length} resultados en esta ubicación.</p>
    <div class="text-gray-500 cursor-pointer hover:text-gray-600 drawer__close">
      <i data-feather="x-circle"></i>
    </div>
  </div>
  <!-- Drawer Close ENd -->`

  const items = []
  estateList.forEach((estateData, index) => {
    const itemLeft =
    `<!-- Estate Image -->
    <div class="flex items-center gap-2">
      <img class="h-auto" src="${estateData.image}" />
    </div>
    <!-- Estate Image -->`

    const itemRight =
    `<!-- Estate Information -->
    <div class="overflow-hidden">
      ${
        estateData.location.address || estateData.location.district
        ? `<!-- Estate Address -->
          <div class="flex items-center gap-1 mb-2 text-sm text-gray-500">
            <i data-feather="map-pin"></i>
            <p class="whitespace-nowrap overflow-hidden text-ellipsis">${estateData.location.address || estateData.location.district}</p>
          </div>
          <!-- Estate Address END-->`
        : ''
      }
      <!-- Estate Title -->
      <h2 class="text-lg m-2 font-bold">${estateData.title}</h2>
      <!-- Estate Title END -->
      <!-- Estate Price -->
      <div class="py-2">
        <div>
          <p class="text-lg text-green-600">${estateData.formatted_usd_price}</p>
        </div>
      </div>
      <!-- Estate Price END -->
      <!-- Estate Characteristics -->
      <div class="flex flex-wrap gap-6">
        ${characteristicsMap.filter(characteristic => {
          if (characteristic.key === 'build_area') return false
          if (characteristic.key === 'years_old_name') return false
          return true
        }).map(characteristic => {
          return displayCharacteristicMinify(characteristic, estateData)
        }).join('')}
      </div>
      <!-- Estate Characteristics END -->
    </div>
    <!-- Estate Information END -->`

    items.push(`
    <div class="flex rounded shadow-md gap-4 p-4 hover:shadow-lg cursor-pointer open__location" data-id="${estateData.internal_id}">
      ${itemLeft}
      ${itemRight}
    </div>
    ${index !== estateList.length - 1 ? '<hr class="my-4 border-gray-300">' : ''}`)
  })

  return `${drawerHeader}
  <div class="flex flex-col">
    ${items.join('')}
  </div>`
}

export default DrawerList
