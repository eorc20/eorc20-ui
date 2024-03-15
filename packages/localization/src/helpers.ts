import { EN } from './config/languages'

const publicUrl = process.env.PUBLIC_URL || ''

export const LS_KEY = 'evm_language'
export const fetchLocale = async (locale) => {
  const en = fetch(`${publicUrl}/locales/en-US.json?v=${new Date().getTime()}`)
  const tw = fetch(`${publicUrl}/locales/zh-TW.json?v=${new Date().getTime()}`)
  const ko = fetch(`${publicUrl}/locales/ko-KR.json?v=${new Date().getTime()}`)
  if (locale === 'en-US' && (await en).ok) {
    const data = await (await en).json()
    return data
  }
  if (locale === 'zh-TW' && (await tw).ok) {
    const data = await (await tw).json()
    return data
  }
  if (locale === 'ko-KR' && (await ko).ok) {
    const data = await (await ko).json()
    return data
  }
  console.error(`API: Failed to fetch locale ${locale}`, (await en).statusText)
  console.error(`API: Failed to fetch locale ${locale}`, (await tw).statusText)
  console.error(`API: Failed to fetch locale ${locale}`, (await ko).statusText)
  return null
}

// export const fetchLocale = async (locale) => {
//   const en = await fetch(`${publicUrl}/locales/en-US.json`)
//   const tw = await fetch(`${publicUrl}/locales/zh-TW.json`)
//   const ko = await fetch(`${publicUrl}/locales/ko-KR.json`)
//   // if (response.ok) {
//   //   const data = await response.json()
//   //   return data
//   // }
//   if (locale === 'en-US' && en.ok) {
//     // eslint-disable-next-line no-return-await
//     return await en.json()
//   } if (locale === 'zh-TW' && tw.ok) {
//     // eslint-disable-next-line no-return-await
//     return await tw.json()
//   } if (locale === 'ko-KR' && ko.ok) {
//     // eslint-disable-next-line no-return-await
//     return await ko.json()
//   }
//   // const response = await fetch(`${publicUrl}/locales/${locale}.json`)
//   // if (response.ok) {
//   //   const data = await response.json()
//   //   return data
//   // }

//   // console.error(`API: Failed to fetch locale ${locale}`, response.statusText)
//   return null
// }

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
