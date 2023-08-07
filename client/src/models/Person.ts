import { Contact } from './Contact'

export type Person = {
    id: string
    name: string
    email: string
    birthDate: Date
    ein: string
    contacts: Contact[]
}

export type PersonRow = {
    id: string
    name: string
    email: string
    birthDate: Date
    ein: string
    selected: boolean
}
