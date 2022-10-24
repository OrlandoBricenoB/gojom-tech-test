import { isEmpty } from 'lodash'
import { getEstateOne } from '../api/Database'
import observer from '../api/Observer'
import DrawerDetails from './DrawerDetails'
import DrawerList from './DrawerList'

// * Elemento del drawer
const drawerEl = document.querySelector('.drawer')

observer.subscribe({
  name: 'drawer',
  callback: ({
    status,
    data
  }) => {
    if (!drawerEl) return
    // * Display or hide Drawer.
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

    // * Wait for transition ends to enable overflow.
    setTimeout(() => {
      drawerEl.classList.remove('overflow-hidden')
    }, 200)

    // * Give data for display in drawer.
    const {
      id,
      ignoreSameLocation = false
    } = data
    const estateData = getEstateOne(id)

    // * Get all real estate in this location.
    const markersInSameLocation = []
    window.markersIDList.forEach(markerID => {
      // * Avoid comparing itself.
      if (markerID === id) return

      // * Get locations
      const estateMarkerData = getEstateOne(markerID)
      const markerLocation = estateMarkerData.location
      const estateLocation = estateData.location

      // * Same location.
      if (markerLocation.latitude === estateLocation.latitude && markerLocation.longitude === estateLocation.longitude) {
        markersInSameLocation.push(estateMarkerData)
      }
    })

    if (isEmpty(estateData)) return observer.notify('drawer', { status: false })

    // * If have markers in same location, display a list with estates.
    if (!isEmpty(markersInSameLocation) && !ignoreSameLocation) {
      const drawerHTML = DrawerList([estateData, ...markersInSameLocation])
      drawerEl.innerHTML = drawerHTML

      // * Event click to open detail.
      const openLocations = document.querySelectorAll('.open__location')
      openLocations.forEach(openLocation => {
        openLocation.addEventListener('click', () => {
          const locationID = openLocation.dataset?.id
          observer.notify('drawer', {
            status: true,
            data: {
              id: locationID,
              ignoreSameLocation: true
            }
          })
        })
      })
    } else {
      const drawerHTML = DrawerDetails(estateData)
      drawerEl.innerHTML = drawerHTML
    }

    // * Event to close drawer with close button.
    const closeDrawerButton = document.querySelector('.drawer__close')
    if (closeDrawerButton) {
      closeDrawerButton.addEventListener('click', () => {
        observer.notify('drawer', { status: false })
      })
    } else {
      // * If dont have close button, close this broken drawer.
      observer.notify('drawer', { status: false })
    }

    window.feather.replace()
  }
})
