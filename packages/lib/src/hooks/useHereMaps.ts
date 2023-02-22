import H from '@here/maps-api-for-javascript'
import { useContext } from 'react'
import { HereMapsContext } from '@/HereMapsProvider';

export const useHereMaps = (): H.Map | undefined => {
  return useContext(HereMapsContext);
}