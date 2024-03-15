function formatTimestamp(timestamp: number, type: 1 | 2 | 3 | 4 = 1): string {
  if (!timestamp) return '-'
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  let formattedDate: string
  if (type === 1) {
    formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`
  } else if (type === 2) {
    formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`
  } else if (type === 3) {
    formattedDate = `${month}/${day} ${hours}:${minutes}`
  } else if (type === 4) {
    formattedDate = `${year}-${month}-${day}`
  } else {
    throw new Error('Invalid type')
  }

  return formattedDate
}

export default formatTimestamp
