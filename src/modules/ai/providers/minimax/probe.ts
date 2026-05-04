import type { AiConfigFormData } from '@/modules/ai/config'
import { probeProviderConfig } from '../shared'
import type { AiProviderStatus } from '../types'
import { discoverMinimaxModels } from './models'
import { MINIMAX_PROVIDER_LABEL } from './types'

export async function probeMinimaxProvider(config: AiConfigFormData): Promise<AiProviderStatus> {
  return await probeProviderConfig({
    config,
    label: MINIMAX_PROVIDER_LABEL,
    discoverModels: discoverMinimaxModels,
  })
}
