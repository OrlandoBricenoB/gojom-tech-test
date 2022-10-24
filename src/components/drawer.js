import { capitalize, isEmpty } from 'lodash'
import { characteristicsMap, displayCharacteristic } from './estateCharacteristic'
import { getEstateOne } from '../utils/Database'
import observer from '../utils/Observer'

// * Elemento del drawer
const drawerEl = document.querySelector('.drawer')

observer.subscribe({
  name: 'drawer',
  callback: ({
    status,
    data
  }) => {
    if (!drawerEl) return
    if (status) {
      drawerEl.classList.add('overflow-hidden')
      drawerEl.classList.add('drawer--active')
      drawerEl.classList.add('p-4')
    } else {
      drawerEl.classList.remove('drawer--active')
      drawerEl.classList.remove('p-4')
      drawerEl.innerHTML = ''
      return
    }

    setTimeout(() => {
      drawerEl.classList.remove('overflow-hidden')
    }, 200)

    // * Give data for display in drawer.
    const { id } = data
    const estateData = getEstateOne(id)

    console.log({ estateData })
    if (isEmpty(estateData)) return observer.notify('drawer', { status: false })

    const drawerHeader = 
      `<!-- Estate Type and Operation -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex gap-3">
          <div class="py-1 text-sm text-green-600 bg-green-200 border-none badge">${capitalize(estateData.property_type)}</div>
          <div class="py-1 text-sm text-pink-600 bg-pink-200 border-none badge">${capitalize(estateData.operation_type)}</div>
        </div>
        <div class="self-end text-gray-500 cursor-pointer hover:text-gray-600 drawer__close">
          <i data-feather="x-circle"></i>
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
              <i data-feather="map-pin"></i>
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

    drawerEl.innerHTML = 
      `${drawerHeader}
      ${drawerTitle}
      ${drawerInformation}`

    // * Event to close drawer with close button.
    const closeDrawerButton = document.querySelector('.drawer__close')
    closeDrawerButton.addEventListener('click', () => {
      observer.notify('drawer', { status: false })
    })

    feather.replace()
  }
})
