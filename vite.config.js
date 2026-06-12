import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BASE_PATH = '/new-drip-site'

/** Dev-only: normalize URLs so they always match the GitHub Pages base path. */
function devBaseRedirect() {
  return {
    name: 'dev-base-redirect',
    configureServer: {
      order: 'pre',
      handler(server) {
        server.middlewares.use((req, res, next) => {
          const raw = req.url ?? '/'
          const queryIndex = raw.indexOf('?')
          const pathname = queryIndex === -1 ? raw : raw.slice(0, queryIndex)
          const search = queryIndex === -1 ? '' : raw.slice(queryIndex)

          const isUnderBase =
            pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`)

          if (isUnderBase) {
            // /new-drip-site (no slash) 404s in Vite's base middleware — normalize first.
            if (pathname === BASE_PATH) {
              res.writeHead(301, { Location: `${BASE_PATH}/${search}` })
              res.end()
              return
            }
            return next()
          }

          if (pathname === '/' || pathname === '/index.html') {
            res.writeHead(302, { Location: `${BASE_PATH}/${search}` })
            res.end()
            return
          }

          const subpath = pathname.replace(/^\//, '')
          res.writeHead(302, { Location: `${BASE_PATH}/${subpath}${search}` })
          res.end()
        })
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: `${BASE_PATH}/`,
  plugins: [command === 'serve' ? devBaseRedirect() : null, react()].filter(Boolean),
  server: {
    open: `${BASE_PATH}/`,
  },
}))
