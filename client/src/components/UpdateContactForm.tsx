import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { FormInput } from './FormInput'
import { Contact } from '../models/Contact'
import RemoveIcon from '@mui/icons-material/Remove'
import { ConfirmModal } from './ConfirmModal'
import { useState } from 'react'

type InputProps = {
    number: number
    initialData: Contact
    handleContactChange: (contactIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void
    handleDeleteContact: (index: number) => void
    error: boolean
}

export const UpdateContactForm: React.FC<InputProps> = ({ number, initialData, handleContactChange, handleDeleteContact, error }) => {
    const [openConfirmModal, setOpenConfirmModal] = useState(false)

    const handleCancelDelete = () => {
        setOpenConfirmModal(false)
    }

    const handleConfirmDelete = () => {
        handleDeleteContact(number)
    }

    return (
        <Box sx={{ paddingTop: '8px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', justifyContent: 'space-between', margin: '5px' }}>
                <Typography sx={{ color: 'black' }}>Contato número {number + 1}</Typography>
                <Tooltip title={!number ? 'É preciso manter ao menos um contato!' : ''} placement="top">
                    <span>
                        <IconButton
                            sx={{ backgroundColor: '#9D5C63', color: '#fff', width: '20px', height: '20px', ':hover': { backgroundColor: '#9D5C63' } }}
                            onClick={() => {
                                if (!initialData.id.length) {
                                    handleDeleteContact(number)
                                    return
                                }
                                setOpenConfirmModal(true)
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
                error={error}
            />
            <FormInput
                type="email"
                name="email"
                value={initialData.email}
                handleChange={(e) => {
                    handleContactChange(number, e)
                }}
                labelText="Email"
                error={error}
            />
            <FormInput
                type="tel"
                name="phoneNumber"
                value={initialData.phoneNumber}
                handleChange={(e) => {
                    handleContactChange(number, e)
                }}
                labelText="Telefone"
                error={error}
            />
            <ConfirmModal
                open={openConfirmModal}
                setOpenConfirmModal={setOpenConfirmModal}
                message="Tem certeza que excluir este contato? Este é um processo sem volta!"
                handleCancelDelete={handleCancelDelete}
                handleConfirmDelete={handleConfirmDelete}
            ></ConfirmModal>
        </Box>
    )
}
