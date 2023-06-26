import { Heading, Button, Image, useToast } from '@chakra-ui/react'
import { Head } from '../components/layout/Head'
// import Image from 'next/image'
import { LinkComponent } from '../components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { useFeeData, useSigner, useAccount, useBalance, useNetwork } from 'wagmi'
import { ethers } from 'ethers'
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../lib/consts'
// import useSound from 'use-sound' // https://www.joshwcomeau.com/react/announcing-use-sound-react-hook/
// const stevie = 'https://bafybeicxvrehw23nzkwjcxvsytimqj2wos7dhh4evrv5kscbbj6agilcsy.ipfs.w3s.link/another-star.mp3'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)
  const [userBal, setUserBal] = useState<string>('')
  const [txLink, setTxLink] = useState<string>('')

  const toast = useToast()

  const { data } = useFeeData()
  const { address, isConnecting, isDisconnected } = useAccount()

  const { data: signer } = useSigner()
  const {
    data: bal,
    isError,
    isLoading,
  } = useBalance({
    address: address,
  })
  const network = useNetwork()

  // const [play, { stop, pause }] = useSound(stevie, {
  //   volume: 0.5,
  // })

  const explorerUrl = network.chain?.blockExplorers?.default.url

  const nft = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer)

  useEffect(() => {
    const val = Number(bal?.formatted).toFixed(3)
    setUserBal(String(val) + ' ' + bal?.symbol)
  }, [bal?.formatted, bal?.symbol, address])

  const checkFees = () => {
    console.log('data?.formatted:', JSON.stringify(data?.formatted))
    return JSON.stringify(data?.formatted)
  }

  const mint = async () => {
    console.log('minting...')
    try {
      setLoading(true)
      const call = await nft.safeMint()
      const nftReceipt = await call.wait(1)
      console.log('tx:', nftReceipt)
      setTxLink(explorerUrl + '/tx/' + nftReceipt.transactionHash)
      setLoading(false)
      toast({
        title: 'Success',
        description: "Congrats! You're now the happy owner of this NFT!",
        status: 'success',
        duration: 8000,
        position: 'top',
        isClosable: true,
      })
    } catch (e) {
      toast({
        title: 'Mint failed',
        description: 'Something went wrong during the minting process, sorry about that. Please try again.',
        status: 'error',
        duration: 8000,
        position: 'top',
        isClosable: true,
      })
      setLoading(false)
      console.log('error:', e)
    }
  }

  return (
    <>
      <Head />

      <main>
        <Heading as="h2">You&apos;re not late!</Heading>

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
              <LinkComponent target="blank" href={`${explorerUrl}/address/${NFT_CONTRACT_ADDRESS}`}>
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
            <LinkComponent target="blank" href={txLink}>
              {txLink}
            </LinkComponent>
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
