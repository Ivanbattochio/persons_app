import { UpdatePersonFormProps } from '../models/Person'
import { FormInput } from './FormInput'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import { FormDateInput } from './FormDateInput'
import { UpdateContactForm } from './UpdateContactForm'
import AddCircleIcon from '@mui/icons-material/AddCircle'
export const UpdatePersonForm: React.FC<UpdatePersonFormProps> = ({
    initialData,
    onChange,
    handleDateChange,
    handleContactChange,
    handleAddContact,
    handleDeleteContact,
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px', alignItems: 'center', width: '100%' }}>
            <FormInput type="text" name="name" value={initialData.name} handleChange={onChange} labelText="Nome" error />
            <Divider sx={{ width: '80%', alignSelf: 'center' }} />
            <FormInput type="email" name="email" value={initialData.email} handleChange={onChange} labelText="Email" error />
            <Divider sx={{ width: '80%', alignSelf: 'center' }} />
            <FormInput type="text" name="ein" value={initialData.ein} handleChange={onChange} labelText="CPF" error />
            <Divider sx={{ width: '80%', alignSelf: 'center' }} />
            <FormDateInput type="date" value={initialData.birthDate} handleChange={handleDateChange} labelText="Data de nascimento" />
            <Divider sx={{ width: '80%', alignSelf: 'center', borderBottomWidth: '3px', borderRadius: '3px' }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    overflowX: 'auto',
                    width: '100%',
                    alignItems: { xs: 'center', md: 'inherit' },
                    gap: '20px',
                }}
            >
                {initialData.contacts.map((contact, index) => (
                    <UpdateContactForm
                        number={index}
                        initialData={contact}
                        handleContactChange={handleContactChange}
                        handleDeleteContact={handleDeleteContact}
                    ></UpdateContactForm>
                ))}
                <Tooltip title="Adicionar novo contato" placement="right">
                    <IconButton
                        sx={{
                            alignSelf: 'center',
                            marginTop: { xs: 'opx', md: '45px' },
                            height: '40px',
                            color: 'green',
                        }}
                        onClick={handleAddContact}
                    >
                        <AddCircleIcon></AddCircleIcon>
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default UpdatePersonForm
