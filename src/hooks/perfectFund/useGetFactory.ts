import { useFactoryContract } from 'hooks/useContract'
import { useCallback, useEffect, useState } from 'react'

const useGetFactory = () => {
  const [allFundsList, setAllFundsList] = useState<string[]>([])
  const contract = useFactoryContract()
  const fetchFactory = useCallback(() => {
    setAllFundsList(contract?.getFunds())
  }, [allFundsList])

  useEffect(() => {
    console.log(contract)
    setAllFundsList(contract?.getFunds())
  }, [])

  // console.log(library?.getContractAt('Fund', ))

  return [allFundsList, fetchFactory]
}

export default useGetFactory
