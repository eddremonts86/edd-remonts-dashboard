const fs = require('fs')
const path =
  '/Volumes/Works/github/iaWorkSpace/apps/edd-remonts-dashboard/src/portfolio/components/hero/HeroSection.tsx'
const content = fs.readFileSync(path, 'utf8')
const marker = '[data:cache_control;base64,ZXBoZW1lcmFs]'
if (content.includes(marker)) {
  const cleaned = content.split(marker)[0]
  fs.writeFileSync(path, cleaned)
  console.log('Fixed HeroSection.tsx, new length:', cleaned.length)
} else {
  console.log('No corruption found in HeroSection.tsx')
}
