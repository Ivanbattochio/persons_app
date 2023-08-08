import { Contact, ContactCreationModel } from './Contact'
import { PersonErrorsObject } from './ErrorsObject'

export type Person = {
    id: string
    name: string
    email: string
    birthDate: Date
    ein: string
    contacts: Contact[]
}

export type PersonCreationModel = {
    name: string
    email: string
    birthDate: Date
    ein: string
    contacts: ContactCreationModel[]
}

export type PersonRow = {
    id: string
    name: string
    email: string
    birthDate: Date
    ein: string
    selected: boolean
}
export type UpdatePersonFormProps = {
    initialData: Person
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleDateChange: (value: Date | null) => void
    errors: PersonErrorsObject
    setErrors: React.Dispatch<React.SetStateAction<PersonErrorsObject>>
    handleContactChange: (contactIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void
    handleAddContact: () => void
    handleDeleteContact: (index: number) => void
}

export type CreatePersonFormProps = {
    initialData: PersonCreationModel
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleDateChange: (value: Date | null) => void
    errors: PersonErrorsObject
    setErrors: React.Dispatch<React.SetStateAction<PersonErrorsObject>>
    handleContactChange: (contactIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void
    handleAddContact: () => void
    handleDeleteContact: (index: number) => void
}
