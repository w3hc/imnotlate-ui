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
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: 'REACT' },
  { option: 'CUSTOM' },
  { option: 'ROULETTE', style: { textColor: '#f9dd50' } },
  { option: 'WHEEL' },
  { option: 'REACT' },
  { option: 'CUSTOM' },
  { option: 'ROULETTE', style: { textColor: '#70bbe0' } },
  { option: 'WHEEL' },
]

const backgroundColors = ['#ff8f43', '#70bbe0', '#0b3351', '#f9dd50']
const textColors = ['#0b3351']
const outerBorderColor = '#eeeeee'
const outerBorderWidth = 5
const innerBorderColor = '#30261a'
const innerBorderWidth = 0
const innerRadius = 0
const radiusLineColor = '#eeeeee'
const radiusLineWidth = 8
const fontFamily = 'Nunito'
const fontWeight = 'bold'
const fontSize = 20
const fontStyle = 'normal'
const textDistance = 60
const spinDuration = 3.0

export default function Home() {
  if (typeof window !== 'undefined') {
    //This code is executed in the browser
    console.log('window.innerWidth #1:', window.innerWidth)
  }
  console.log('radiusLineColor:', radiusLineColor)
  const [loading, setLoading] = useState<boolean>(false)
  const [userBal, setUserBal] = useState<string>('')
  const [txLink, setTxLink] = useState<string>('')
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

  const toast = useToast()

  // const { data } = useFeeData()
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
    if (typeof window !== 'undefined') {
      //This code is executed in the browser
      console.log('window.innerWidth #2:', window.innerWidth)
    }
  }, [bal?.formatted, bal?.symbol, address])

  if (typeof window !== 'undefined') {
    //This code is executed in the browser
    console.log('window.innerWidth #3:', window.innerWidth)
  }
  return (
    <>
      <Head />

      <main>
        {isDisconnected ? (
          <>
            <br />
            <p>Please connect your wallet.</p>
          </>
        ) : (
          <>
            <br />
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={backgroundColors}
              textColors={textColors}
              fontFamily={fontFamily}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontStyle={fontStyle}
              outerBorderColor={outerBorderColor}
              outerBorderWidth={outerBorderWidth}
              innerRadius={innerRadius}
              innerBorderColor={innerBorderColor}
              innerBorderWidth={innerBorderWidth}
              radiusLineColor={radiusLineColor}
              radiusLineWidth={radiusLineWidth}
              spinDuration={spinDuration}
              startingOptionIndex={2}
              // perpendicularText
              textDistance={textDistance}
              onStopSpinning={() => {
                setMustSpin(false)
              }}
            />
          </>
        )}

        <br />
        {!loading ? (
          <Button colorScheme="green" variant="outline" onClick={handleSpinClick}>
            Spin
          </Button>
        ) : (
          <Button isLoading colorScheme="green" loadingText="Spinning" variant="outline">
            Spin
          </Button>
        )}

        {txLink && (
          <>
            <br />
            <br />
            <Image
              height="800"
              width="800"
              alt="arthera-logo"
              src="https://bafybeiaswv3numcgmtcby6mgdlurmzisi5fzzujozyistx6ozqvutrdony.ipfs.w3s.link/arthera-logo.png"
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
