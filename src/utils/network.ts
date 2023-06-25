export function GetNetworkColor(chain?: string) {
  if (chain === 'goerli') return 'green'
  if (chain === 'artheraTestnet') return 'blue'
  return 'gray'
}
