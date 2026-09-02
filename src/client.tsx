import { StartClient } from '@tanstack/react-start/client'
import { hydrateRoot } from 'react-dom/client'
import { registerServiceWorker } from '@/shared/lib/pwa'

hydrateRoot(document, <StartClient />)

registerServiceWorker()
