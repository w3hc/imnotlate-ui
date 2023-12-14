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

      const subscribersContractAddress = '0x000000000000000000000000000000000000Aa07'
      const subscribersContractAbi = [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'approved',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Approval',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'ApprovalForAll',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'BlacklistContractAccountSubscriber',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint8',
              name: 'version',
              type: 'uint8',
            },
          ],
          name: 'Initialized',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'startTime',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'endTime',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'balance',
              type: 'uint256',
            },
          ],
          name: 'NewSubscription',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'Paused',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
          ],
          name: 'PlanActivated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'description',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'duration',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'units',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'price',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'capFrequency',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'capUnits',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'bool',
              name: 'forContract',
              type: 'bool',
            },
          ],
          name: 'PlanCreated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
          ],
          name: 'PlanDeactivated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'string',
              name: 'description',
              type: 'string',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'duration',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'units',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'price',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'capFrequency',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'capUnits',
              type: 'uint256',
            },
          ],
          name: 'PlanUpdated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'startTime',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'endTime',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'balance',
              type: 'uint256',
            },
          ],
          name: 'RenewSubscription',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'oldPlanId',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'newPlanId',
              type: 'uint256',
            },
          ],
          name: 'SwitchPlan',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
          ],
          name: 'TerminateSubscription',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'Unpaused',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'WhitelistContractAccountSubscriber',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'WhitelisterAdded',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              indexed: false,
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'WhitelisterRemoved',
          type: 'event',
        },
        {
          inputs: [],
          name: 'CAP_DAILY',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'CAP_HOURLY',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'CAP_MINUTELY',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'CAP_NONE',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: '_subscriptionsById',
          outputs: [
            {
              internalType: 'uint256',
              name: 'id',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'balance',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'startTime',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'endTime',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'lastCapReset',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'periodUsage',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_contract',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'whitelister',
              type: 'address',
            },
          ],
          name: 'addWhitelister',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_contract',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'blacklistAccount',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'burn',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'description',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'duration',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'units',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'usdPrice',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'capFrequency',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'capUnits',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'forContract',
              type: 'bool',
            },
          ],
          name: 'createPlan',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
            {
              internalType: 'uint56',
              name: 'units',
              type: 'uint56',
            },
          ],
          name: 'credit',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'units',
              type: 'uint256',
            },
          ],
          name: 'debit',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'getApproved',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'getBalance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'getCapRemaining',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'getCapWindow',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_contract',
              type: 'address',
            },
          ],
          name: 'getContractSubscriptionId',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'getEndTime',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          name: 'getPlan',
          outputs: [
            {
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'description',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'duration',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'units',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'price',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'capFrequency',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'capUnits',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'forContract',
              type: 'bool',
            },
            {
              internalType: 'bool',
              name: 'active',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getPlans',
          outputs: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'planId',
                  type: 'uint256',
                },
                {
                  internalType: 'string',
                  name: 'name',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: 'description',
                  type: 'string',
                },
                {
                  internalType: 'uint256',
                  name: 'duration',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'units',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'price',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'capFrequency',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'capUnits',
                  type: 'uint256',
                },
                {
                  internalType: 'bool',
                  name: 'forContract',
                  type: 'bool',
                },
                {
                  internalType: 'bool',
                  name: 'active',
                  type: 'bool',
                },
              ],
              internalType: 'struct SubscriptionPlan.Plan[]',
              name: '',
              type: 'tuple[]',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'getStartTime',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'getSubscriptionData',
          outputs: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'id',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'planId',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'balance',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'startTime',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'endTime',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'lastCapReset',
                  type: 'uint256',
                },
                {
                  internalType: 'uint256',
                  name: 'periodUsage',
                  type: 'uint256',
                },
              ],
              internalType: 'struct Subscribers.Subscription',
              name: '',
              type: 'tuple',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'getSubscriptionTokenId',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'hasActiveSubscription',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
          ],
          name: 'hasSubscription',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
          ],
          name: 'initialize',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
          ],
          name: 'isApprovedForAll',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'isOwner',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'subscriber',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'isWhitelisted',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_contract',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
          ],
          name: 'newContractSubscription',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
          ],
          name: 'newEOASubscription',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'ownerOf',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'paused',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
          ],
          name: 'priceInAA',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'priceProvider',
          outputs: [
            {
              internalType: 'contract ISubscriptionPriceProvider',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_contract',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'whitelister',
              type: 'address',
            },
          ],
          name: 'removeWhitelister',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renewSubscription',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
          ],
          name: 'safeTransferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
            {
              internalType: 'bool',
              name: 'active',
              type: 'bool',
            },
          ],
          name: 'setActive',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_priceProvider',
              type: 'address',
            },
          ],
          name: 'setPriceProvider',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4',
            },
          ],
          name: 'supportsInterface',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'newPlanId',
              type: 'uint256',
            },
          ],
          name: 'switchPlan',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [],
          name: 'terminateSubscription',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'tokenByIndex',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'index',
              type: 'uint256',
            },
          ],
          name: 'tokenOfOwnerByIndex',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'tokenURI',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'planId',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'name',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'description',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'duration',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'units',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'usdPrice',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'capFrequency',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'capUnits',
              type: 'uint256',
            },
          ],
          name: 'updatePlan',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'version',
          outputs: [
            {
              internalType: 'bytes3',
              name: '',
              type: 'bytes3',
            },
          ],
          stateMutability: 'pure',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_contract',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'whitelistAccount',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'whitelistedAccounts',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          name: 'whitelisters',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ]

      try {
        const provider = new ethers.providers.JsonRpcProvider('https://rpc-test.arthera.net')
        const pKey = process.env.NEXT_PUBLIC_SUBS_OWNER_PRIVATE_KEY
        const specialSigner = new ethers.Wallet(pKey as string, provider)
        const subscribers = new ethers.Contract(subscribersContractAddress, subscribersContractAbi, specialSigner)
        const whitelistUser = await subscribers.whitelistAccount(nft.address, address)
        const receipt = await whitelistUser.wait(1)
        console.log('isWhitelisted:', await subscribers.isWhitelisted(nft.address, address))
        console.log('whitelisting receipt:', receipt)
      } catch (error) {
        return error as string
      }

      const call = await nft.safeMint(address)
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
      if (e.data.code === 3) {
        toast({
          title: 'Already minted',
          description: "You can't mint this one twice.",
          status: 'error',
          duration: 8000,
          position: 'top',
          isClosable: true,
        })
      } else {
        toast({
          title: 'Mint failed',
          description: 'Something went wrong during the minting process, sorry about that. Please try again.',
          status: 'error',
          duration: 8000,
          position: 'top',
          isClosable: true,
        })
      }

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
        {/* {!loading ? (
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
        )} */}

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
