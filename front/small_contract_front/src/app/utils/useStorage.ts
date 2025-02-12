import { 
    useReadContract,
    useWriteContract,
  } from 'wagmi'
  
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const
  
  export const useStorage = () => {
    const { 
      data: storedValue,
      isLoading: isRetrieving,
      isSuccess: isRetrieveSuccess 
    } = useReadContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'retrieve',
    })
  
    const { 
      writeContract: storeValue,
      isPending: isStoring,
      isSuccess: isStoreSuccess 
    } = useWriteContract()
  
    const store = async (value: number) => {
      storeValue({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'store',
        args: [BigInt(value)]
      })
    }
  
    return {
      store,
      isStoring,
      isStoreSuccess,
      storedValue,
      isRetrieving,
      isRetrieveSuccess,
    }
  }