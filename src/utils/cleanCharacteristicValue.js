const cleanCharacteristicValue = (key, value) => {
  if (key === 'bathrooms' || key === 'bedrooms' || key === 'garages') {
    return value.split(' ')[0]
  }
  return value
}

export default cleanCharacteristicValue
