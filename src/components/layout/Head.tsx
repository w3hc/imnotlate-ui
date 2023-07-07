import React from 'react'
import { default as NextHead } from 'next/head'
import { SITE_DESCRIPTION, SITE_NAME } from '../../utils/config'

interface Props {
  title?: string
  description?: string
}

export function Head(props: Props) {
  return (
    <NextHead>
      <title>
        {props.title ?? SITE_NAME} {'v0.1.0'}{' '}
      </title>
      <meta property="og:url" content="https://arthera-faucet-wheel.on.fleek.co/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title ?? SITE_NAME} />
      <meta name="twitter:card" content={SITE_DESCRIPTION} />
      <meta property="og:description" content={props.description ?? SITE_DESCRIPTION} />
      <meta property="og:image" content={'https://bafybeiaswv3numcgmtcby6mgdlurmzisi5fzzujozyistx6ozqvutrdony.ipfs.w3s.link/arthera-logo.png'} />
      <meta name="description" content={props.description ?? SITE_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}
