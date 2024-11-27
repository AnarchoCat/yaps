import messages from './localization.json'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'zh',
    messages: messages
  }
})