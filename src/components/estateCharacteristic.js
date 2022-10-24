import cleanCharacteristicValue from '../utils/cleanCharacteristicValue'

export const characteristicsMap = [
  {
    name: 'Dormitorios',
    key: 'bedrooms',
    icon: 'bed'
  },
  {
    name: 'Baños',
    key: 'bathrooms',
    icon: 'bath'
  },
  {
    name: 'Área Total',
    key: 'total_area',
    icon: 'ruler-combined'
  },
  {
    name: 'Tiempo',
    key: 'years_old_name',
    icon: 'clock'
  },
  {
    name: 'Estac.',
    key: 'garages',
    icon: 'car'
  },
  {
    name: 'Área Techada',
    key: 'build_area',
    icon: 'ruler-combined'
  }
]

export const displayCharacteristic = ({ key, name, icon }, estateData) => {
  if (!estateData[key]) return ''
  return `<!-- Characteristic -->
  <div class="text-gray-500">
    <p class="text-sm">${name}</p>
    <div class="flex items-center gap-2">
      <i class="fas fa-${icon}"></i>
      <p class="text-gray-800">${cleanCharacteristicValue(key, estateData[key])}</p>
    </div>
  </div>
  <!-- Characteristic END -->`
}

export const displayCharacteristicMinify = ({ key, icon }, estateData) => {
  if (!estateData[key]) return ''
  return `<!-- Characteristic -->
  <div class="flex items-center gap-2 text-gray-500">
    <i class="fas fa-${icon}"></i>
    <p class="text-gray-800">${cleanCharacteristicValue(key, estateData[key])}</p>
  </div>
  <!-- Characteristic END -->`
}
