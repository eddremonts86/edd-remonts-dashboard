/**
 * Supported UI languages.
 * Single source of truth for language codes, labels, and browser-locale mapping.
 */
export interface Language {
  code: string
  label: string
  /** Browser navigator.language prefixes that map to this language */
  browserPrefixes: string[]
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'EN', browserPrefixes: ['en'] },
  { code: 'dk', label: 'DK', browserPrefixes: ['da', 'dk'] },
  { code: 'es', label: 'ES', browserPrefixes: ['es'] },
]

export const DEFAULT_LANGUAGE = LANGUAGES[0].code

/**
 * Resolves a browser navigator.language value to a supported app language code.
 * Falls back to DEFAULT_LANGUAGE if no match is found.
 */
export function resolveBrowserLang(navigatorLang: string): string {
  const prefix = navigatorLang.split('-')[0]
  return LANGUAGES.find((l) => l.browserPrefixes.includes(prefix))?.code ?? DEFAULT_LANGUAGE
}
