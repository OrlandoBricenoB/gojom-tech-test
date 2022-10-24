import { capitalize } from 'lodash'
import { characteristicsMap, displayCharacteristic } from './estateCharacteristic'

const DrawerDetails = (estateData) => {
  const drawerHeader =
    `<!-- Estate Type and Operation -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex gap-3">
        <div class="py-1 text-sm text-green-600 bg-green-200 border-none badge">${capitalize(estateData.property_type)}</div>
        <div class="py-1 text-sm text-pink-600 bg-pink-200 border-none badge">${capitalize(estateData.operation_type)}</div>
      </div>
      <div class="self-end text-gray-500 cursor-pointer hover:text-gray-600 drawer__close">
      <i class="fas fa-times-circle"></i>
      </div>
    </div>
    <!-- Estate Type and Operation END -->`

  const drawerTitle =
    `<!-- Estate Image & Title -->
    <div class="drawer__image">
      <img src="${estateData.image}" />
      <!-- Estate Title -->
      <h2 class="text-lg font-bold overflow-hidden text-ellipsis">${estateData.title}</h2>
      <!-- Estate Title END -->
    </div>
    <!-- Estate Image & Title END -->`

  const drawerInformation =
    `<!-- Estate Information -->
    <div class="py-3">
      ${
        estateData.location.address || estateData.location.district
        ? `<!-- Estate Address -->
          <div class="flex items-center gap-1 my-3 text-sm text-gray-500">
            <i class="fas fa-map-marker-alt"></i>
            <p>${estateData.location.address || estateData.location.district}</p>
          </div>
          <!-- Estate Address END-->`
        : ''
      }
      <!-- Estate Price -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2 py-3">
        <div class="md:col-span-2">
          <p class="text-gray-600">Precio</p>
          <p class="text-lg text-green-600">${estateData.formatted_usd_price}</p>
          <p class="text-sm text-gray-400">${estateData.formatted_local_price}</p>
        </div>
        ${estateData.formatted_local_price_by_m2
          ? `<div>
              <p class="text-gray-600">Precio m<sup>2</sup></p>
              <p class="text-lg text-green-600">${estateData.formatted_usd_price_by_m2}</p>
              <p class="text-sm text-gray-400">${estateData.formatted_local_price_by_m2}</p>
            </div>`
          : ''
        }
      </div>
      <!-- Estate Price END -->
      <hr class="mb-3">
      <!-- Estate Characteristics -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        ${characteristicsMap.map(characteristic => {
          return displayCharacteristic(characteristic, estateData)
        }).join('')}
      </div>
      <!-- Estate Characteristics END -->
      <!-- Estate Little Characteristics -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        ${estateData.characteristics.map(characteristic => {
          return `<p class="text-sm text-gray-500">${characteristic}</p>`
        }).join('')}
      </div>
      <!-- Estate Little Characteristics END -->
    </div>
    <!-- Estate Information END -->`

  return `${drawerHeader}${drawerTitle}${drawerInformation}`
}

export default DrawerDetails
