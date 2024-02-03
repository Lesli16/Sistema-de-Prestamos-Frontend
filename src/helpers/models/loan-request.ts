import { Equipment } from "./equipment"
import { User } from "./user"

export interface LoanRequest{
  "id"?:string
  "dateCreated"?:string
  "user"?:User
  "selectedEquipments":LoanSelectedEquipment[]
  "loanRequestStatus"?:LoanRequestStatus
  "loanDuration"?:Date
}

export interface LoanSelectedEquipment{
  "id"?:string
  "equipment":Equipment
  "loanRequest"?:LoanRequest,
  "quantity":number
}

export interface LoanRequestStatus{
  "id":string
  "status":string
}
