import { clone, debounce, isEmpty } from 'lodash'
import { filterArrray, appendArray } from './utils/handleArrays'
import observer from './api/Observer'

// * Debounce notify list change.
const debounceNotify = debounce(listName => {
  observer.notify(listName)
}, 250)

// * Badge Tags
const badgeTags = document.querySelectorAll('.tag.badge')
badgeTags.forEach(badgeTag => {
  // * Update list and class active in tags when click.
  badgeTag.addEventListener('click', () => {
    if (badgeTag.classList.contains('badge--active')) badgeTag.classList.remove('badge--active')
    else badgeTag.classList.add('badge--active')

    const {
      list: listName,
      value
    } = badgeTag.dataset

    if (isEmpty(window[listName])) window[listName] = []

    // * Avoid mutation.
    const clonedList = clone(window[listName])
    const existInList = clonedList.find(listItem => listItem === value)

    // * Set new value for global list.
    window[listName] = existInList
      ? filterArrray(clonedList, item => item !== value)
      : appendArray(clonedList, value)

    // * Notify to observer for reactivity with debounce for protect performance.
    debounceNotify(listName)
  })
})
