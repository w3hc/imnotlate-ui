import { Text, Button, useToast, Image } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi'
import { ethers } from 'ethers'
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../utils/nft'
import { useEthersSigner, useEthersProvider } from '../hooks/ethersAdapter'

export default function Home() {
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const provider = useEthersProvider()
  const signer = useEthersSigner()
  const toast = useToast()
  const network = useNetwork()
  const { address, isConnecting, isDisconnected } = useAccount()
  const {
    data: bal,
    isError,
    isLoading,
  } = useBalance({
    address: address,
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [txLink, setTxLink] = useState<string>()
  const [txHash, setTxHash] = useState<string>()
  const [userBal, setUserBal] = useState<string>('')

  const explorerUrl = network.chain?.blockExplorers?.default.url

  useEffect(() => {
    const init = async () => {
      if (chain?.id !== 10243) {
        switchNetwork?.(10243)
      }
      const val = Number(bal?.formatted).toFixed(3)
      setUserBal(String(val) + ' ' + bal?.symbol)
      console.log('Imnotlate NFT contract address:', NFT_CONTRACT_ADDRESS)
    }
    init()
    // console.log('network:', chain?.name)
    // console.log('signer:', signer)
    // console.log('provider:', provider)
  }, [signer])

  const mint = async () => {
    try {
      if (!signer) {
        toast({
          title: 'No wallet',
          description: 'Please connect your wallet first.',
          status: 'error',
          position: 'bottom',
          variant: 'subtle',
          duration: 9000,
          isClosable: true,
        })
        return
      }
      setLoading(true)
      setTxHash('')
      setTxLink('')
      const nft = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer)
      const call = await nft.safeMint(signer.address)
      const receipt = await call.wait()
      console.log('tx:', receipt)
      setTxHash(receipt.hash)
      setTxLink('https://explorer-test.arthera.net/tx/' + receipt.hash)
      setLoading(false)
      toast({
        title: 'Successful mint',
        description: 'Congrats, your NFT was minted! 🎉',
        status: 'success',
        position: 'bottom',
        variant: 'subtle',
        duration: 20000,
        isClosable: true,
      })
    } catch (e) {
      setLoading(false)
      console.log('error:', e)
      toast({
        title: 'Woops',
        description: "Something went wrong during the minting process. It's probably because you already minted it.",
        status: 'error',
        position: 'bottom',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Head />

      <main>
        <HeadingComponent as="h2">You&apos;re not late!</HeadingComponent>

        {isDisconnected ? (
          <>
            <br />
            <p>Please connect your wallet.</p>
          </>
        ) : (
          <>
            <br />

            <p>
              You&apos;re about to mint 1 <strong>I&apos;m not late NFT</strong> on <strong>{network.chain?.name}</strong>.
            </p>
            <br />
            <p>
              NFT contract address:{' '}
              <LinkComponent href={`${explorerUrl}/address/${NFT_CONTRACT_ADDRESS}`}>
                <strong>{NFT_CONTRACT_ADDRESS}</strong>
              </LinkComponent>{' '}
            </p>
            <br />
            <p>
              You&apos;re connected to <strong>{network.chain?.name}</strong> and your wallet currently holds
              <strong> {userBal}</strong>. You can go ahead and click on the &apos;Mint&apos; button below: you will be invited to sign your
              transaction.{' '}
            </p>
          </>
        )}

        <br />
        {!loading ? (
          !txLink ? (
            <Button colorScheme="green" variant="outline" onClick={mint}>
              Mint
            </Button>
          ) : (
            <Button disabled colorScheme="green" variant="outline" onClick={mint}>
              Mint
            </Button>
          )
        ) : (
          <Button isLoading colorScheme="green" loadingText="Minting" variant="outline">
            Mint
          </Button>
        )}

        {txLink && (
          <>
            <br />
            <br />
            <Image
              height="800"
              width="800"
              alt="Imnotlate"
              src="https://bafybeihaafblie2zrbb2y4dsagmyaw5txkqdznzv3ivzrtxliyhqqzhdka.ipfs.w3s.link/imnotlate"
            />
            <br />
            <p>This is a historic moment. You&apos;re not late and you can prove it.</p>
            <br />
            <LinkComponent href={txLink}>{txLink}</LinkComponent>
          </>
        )}
        <br />
        <br />
        {/* {txLink && (
          <Button colorScheme="red" variant="outline" onClick={() => stop()}>
            Stop the music
          </Button>
        )} */}
        {/* <Image height="800" width="800" alt="contract-image" src="/thistle-contract-feb-15-2023.png" /> */}
      </main>
    </>
  )
}
