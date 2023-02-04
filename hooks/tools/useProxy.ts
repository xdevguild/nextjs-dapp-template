// Workaround for next ssr false positive warning
// https://github.com/pmndrs/valtio/discussions/652

import { snapshot } from 'valtio'
import { useProxy as useProxyOrig } from 'valtio/utils'

const isSSR = typeof window === 'undefined'
export const useProxy = isSSR ? <T extends object>(p: T) => snapshot(p) : useProxyOrig
