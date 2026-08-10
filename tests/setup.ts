import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from '../src/shared/lib/i18n/locales/en/common.json'
import enErrors from '../src/shared/lib/i18n/locales/en/errors.json'

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })

// Components under test call useTranslation(). With no initialised instance
// react-i18next hands back a stub `t` that returns the default string verbatim,
// so an interpolated label renders as the literal "Filter by {{label}}" and the
// test asserts against text no user will ever see.
//
// English only, and no language detector: the detector would read navigator or
// localStorage and make the suite depend on the machine running it.
void i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common', 'errors'],
  defaultNS: 'common',
  resources: { en: { common: enCommon, errors: enErrors } },
  interpolation: { escapeValue: false },
})
