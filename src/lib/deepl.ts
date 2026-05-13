import * as deepl from 'deepl-node'

let _translator: deepl.Translator | null = null

export function getDeepL(): deepl.Translator {
  if (!_translator) {
    const key = process.env.DEEPL_API_KEY
    if (!key) throw new Error('Missing DEEPL_API_KEY environment variable')
    _translator = new deepl.Translator(key)
  }
  return _translator
}
