import { useTranslation } from 'react-i18next'
import { Radio } from '@/types/responses/radios'
import { ISong } from '@/types/responses/song'
import { appName } from '@/utils/appName'
import { manageMediaSession } from '@/utils/setMediaSession'

export default function useMediaSession() {
  const { t } = useTranslation()
  const radioLabel = t('radios.label')

  function resetSession() {
    document.title = appName
    manageMediaSession.removeMediaSession()
  }

  function radioSession(radio: Radio) {
    document.title = `${radioLabel} - ${radio.name} - ${appName}`
    manageMediaSession.setRadioMediaSession(radioLabel, radio.name)
  }

  function songSession(song: ISong) {
    document.title = `${song.title} - ${song.artist} - ${appName}`
    manageMediaSession.setMediaSession(song)
  }

  function playbackState(state: boolean) {
    manageMediaSession.setPlaybackState(state)
  }

  return {
    resetSession,
    radioSession,
    songSession,
    playbackState,
  }
}
