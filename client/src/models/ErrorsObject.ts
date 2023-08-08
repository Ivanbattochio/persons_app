export type PersonErrorsObject = {
    name: boolean
    email: boolean
    birthDate: boolean
    ein: boolean
    contacts: boolean
}

export type BadRequestResponse = {
    field: 'name' | 'email' | 'birthDate' | 'ein' | 'contacts'
    message: string
    statusCode: number
}
