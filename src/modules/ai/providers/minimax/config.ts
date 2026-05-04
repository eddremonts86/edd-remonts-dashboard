import { buildDefaultConfig } from '@/modules/ai/config'
import { MINIMAX_PROVIDER_ID } from './types'

export const getMinimaxDefaultConfig = () => buildDefaultConfig(MINIMAX_PROVIDER_ID)
