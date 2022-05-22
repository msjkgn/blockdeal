import { Contract } from '@ethersproject/contracts'

export interface FactoryProps extends Contract {
  getFunds: () => string[]
}
