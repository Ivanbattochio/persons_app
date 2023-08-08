import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { FormInput } from './FormInput'
import { Contact } from '../models/Contact'
import RemoveIcon from '@mui/icons-material/Remove'
type InputProps = {
    number: number
    initialData: Contact
    handleContactChange: (contactIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void
    handleDeleteContact: (index: number) => void
}

export const UpdateContactForm: React.FC<InputProps> = ({ number, initialData, handleContactChange, handleDeleteContact }) => {
    console.log({ initialData })

    return (
        <Box sx={{ paddingTop: '8px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', justifyContent: 'space-between', margin: '5px' }}>
                <Typography sx={{ color: 'black' }}>Contato número {number + 1}</Typography>
                <Tooltip title={!number ? 'É preciso manter ao menos um contato!' : ''} placement="top">
                    <span>
                        <IconButton
                            sx={{ backgroundColor: '#9D5C63', color: '#fff', width: '20px', height: '20px', ':hover': { backgroundColor: '#9D5C63' } }}
                            onClick={() => {
                                handleDeleteContact(number)
                            }}
                            disabled={!number}
                        >
                            <RemoveIcon></RemoveIcon>
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
            <FormInput
                type="text"
                name="name"
                value={initialData.name}
                handleChange={(e) => {
                    handleContactChange(number, e)
                }}
                labelText="Nome"
                error
            />
            <FormInput
                type="email"
                name="email"
                value={initialData.email}
                handleChange={(e) => {
                    handleContactChange(number, e)
                }}
                labelText="Email"
                error
            />
            <FormInput
                type="tel"
                name="phoneNumber"
                value={initialData.phoneNumber}
                handleChange={(e) => {
                    handleContactChange(number, e)
                }}
                labelText="Telefone"
                error
            />
        </Box>
    )
}
