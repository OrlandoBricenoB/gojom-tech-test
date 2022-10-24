import { isFunction } from 'lodash'

class Observer {
  constructor () {
    this.subscriptors = []
  }

  // * Add a new suscriptor.
  subscribe = ({ name, callback }) => {
    if (typeof callback !== 'function') return

    const existSub = this.subscriptors.find(_sub => {
      return _sub.callback === callback
    })
    if (existSub) return

    // * Create new suscriptor.
    const newSubscriptor = {
      name,
      callback
    }

    // * Add suscription to list.
    this.subscriptors.push(newSubscriptor)

    return {
      unsubscribe: () => {
        this.unsubscribe(newSubscriptor)
      }
    }
  }

  // * Remove a suscriptor.
  unsubscribe = sub => {
    this.subscriptors = this.subscriptors.filter(_sub => {
      return _sub.callback !== sub.callback
    })
  }

  // * Notify all suscriptors with this name.
  notify = (name, data) => {
    this.subscriptors.forEach(_sub => {
      if (_sub.name === name && isFunction(_sub.callback)) {
        console.log({ data }, 'llamar callback')
        _sub.callback(data)
      }
    })
  }
}

const observer = new Observer()

export default observer
