import { CreatePersonFormProps } from '../models/Person'
import { FormInput } from './FormInput'
import { Box, Divider, IconButton, Tooltip } from '@mui/material'
import { FormDateInput } from './FormDateInput'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { CreateContactForm } from './CreateContactform'

export const CreatePersonForm: React.FC<CreatePersonFormProps> = ({
    initialData,
    onChange,
    handleDateChange,
    handleContactChange,
    handleAddContact,
    handleDeleteContact,
    errors,
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px', alignItems: 'center', width: '100%' }}>
            <FormInput type="text" name="name" value={initialData.name} handleChange={onChange} labelText="Nome" error={errors.name} />
            <Divider sx={{ width: '80%', alignSelf: 'center' }} />
            <FormInput type="email" name="email" value={initialData.email} handleChange={onChange} labelText="Email" error={errors.email} />
            <Divider sx={{ width: '80%', alignSelf: 'center' }} />
            <FormInput type="text" name="ein" value={initialData.ein} handleChange={onChange} labelText="CPF" error={errors.ein} />
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
                    <CreateContactForm
                        number={index}
                        initialData={contact}
                        handleContactChange={handleContactChange}
                        handleDeleteContact={handleDeleteContact}
                        error={errors.contacts}
                    ></CreateContactForm>
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
