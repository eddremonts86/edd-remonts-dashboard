import { createFileRoute } from '@tanstack/react-router'
import type { AiConfigFormData } from '@/modules/ai/config'

export const Route = createFileRoute('/api/ai/test-connection')({
  component: () => null,
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { createJsonErrorResponse, createJsonResponse, testProviderConnection } =
            await import('@/modules/ai/server')

          const rawConfig = (await request.json()) as AiConfigFormData

          if (!rawConfig || !rawConfig.provider) {
            return createJsonErrorResponse('INVALID_CONFIG', 400)
          }

          // If the client sent an empty apiKey, fill it from the server-side normalized
          // config which picks up env vars (e.g. MINIMAX_API_KEY, OPENAI_API_KEY)
          let config = rawConfig
          if (!rawConfig.apiKey && !rawConfig.token) {
            const { getAllAiConfigs } = await import('@/modules/ai/config/store')
            const allConfigs = await getAllAiConfigs()
            const serverConfig = allConfigs.providers[rawConfig.provider]
            if (serverConfig?.apiKey || serverConfig?.token) {
              config = {
                ...rawConfig,
                apiKey: serverConfig.apiKey || rawConfig.apiKey,
                token: serverConfig.token || rawConfig.token,
              }
            }
          }

          return createJsonResponse(await testProviderConnection(config))
        } catch (error) {
          const { createJsonErrorResponse, getErrorMessage } = await import('@/modules/ai/server')
          return createJsonErrorResponse(getErrorMessage(error), 500, { success: false })
        }
      },
    },
  },
})
