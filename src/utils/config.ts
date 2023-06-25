import { ThemingProps } from '@chakra-ui/react'
import { Chain } from '@wagmi/chains'

export const SITE_NAME = 'I&apos;m not late'
export const SITE_DESCRIPTION = 'This is a historic moment. You&apos;re not late and you can prove it.'
export const SITE_URL = 'https://imnotlate.on.fleek.co/'
export const THEME_INITIAL_COLOR = 'dark'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'W3HC'
export const SOCIAL_GITHUB = 'w3hc/nexth'

export const artheraTestnet = {
  id: 10243,
  name: 'Arthera TestNet',
  network: 'artheraTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'AA',
    symbol: 'AA',
  },
  rpcUrls: {
    public: { http: ['https://rpc-test.arthera.net'] },
    default: { http: ['https://rpc-test.arthera.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'Arthera Testnet Explorer', url: 'https://explorer-test.arthera.net' },
    default: { name: 'Arthera Testnet Explorer', url: 'https://explorer-test.arthera.net' },
  },
} as any

export const ETH_CHAINS = [artheraTestnet]
export const alchemyId = process.env.NEXT_PUBLIC_ARBITRUM_ALCHEMY_ID

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
