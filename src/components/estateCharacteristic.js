import cleanCharacteristicValue from '../utils/cleanCharacteristicValue'

export const characteristicsMap = [
  {
    name: 'Dormitorios',
    key: 'bedrooms',
    icon: 'moon'
  },
  {
    name: 'Baños',
    key: 'bathrooms',
    icon: 'droplet'
  },
  {
    name: 'Área Total',
    key: 'total_area',
    icon: 'triangle'
  },
  {
    name: 'Tiempo',
    key: 'years_old_name',
    icon: 'clock'
  },
  {
    name: 'Estac.',
    key: 'garages',
    icon: 'inbox'
  },
  {
    name: 'Área Techada',
    key: 'build_area',
    icon: 'triangle'
  },
]

export const displayCharacteristic = ({ key, name, icon }, estateData) => {
  if (!estateData[key]) return ''
  return `<!-- Characteristic -->
  <div class="text-gray-500">
    <p class="text-sm">${name}</p>
    <div class="flex items-center gap-2">
      <p class="text-gray-800">${cleanCharacteristicValue(key, estateData[key])}</p>
      <i data-feather="${icon}"></i>
    </div>
  </div>
  <!-- Characteristic END -->`
}
