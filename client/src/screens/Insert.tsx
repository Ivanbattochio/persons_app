import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, IconButton, Snackbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'
import axios, { AxiosError } from 'axios'
import { Person, PersonCreationModel } from '../models/Person'
import { BadRequestResponse, PersonErrorsObject } from '../models/ErrorsObject'
import { CreatePersonForm } from '../components/CreatePersonForm'

export const Insert: React.FC = () => {
    const navigate = useNavigate()

    const [notificationOpen, notificationOpenSet] = useState<boolean>(false)
    const [alertMessage, alertMessageSet] = useState<string>('')
    const [alertType, alertTypeSet] = useState<'warning' | 'info' | 'success' | 'error'>('info')

    const [person, setPerson] = useState<PersonCreationModel>({
        name: '',
        email: '',
        birthDate: new Date(),
        ein: '',
        contacts: [{ name: '', phoneNumber: '', email: '' }],
    })

    const [errors, setErrors] = useState<PersonErrorsObject>({
        name: false,
        email: false,
        birthDate: false,
        ein: false,
        contacts: false,
    })

    const openNotification = (message: string, type: 'warning' | 'info' | 'success' | 'error') => {
        alertMessageSet(message)
        alertTypeSet(type)
        notificationOpenSet(true)
    }

    const closeSnackBar = () => {
        alertTypeSet('info')
        alertMessageSet('')
        notificationOpenSet(false)
    }

    const setNewError = (field: 'name' | 'email' | 'birthDate' | 'ein' | 'contacts') => {
        const aux = {
            name: false,
            email: false,
            birthDate: false,
            ein: false,
            contacts: false,
        }

        if (errors[field] !== undefined) {
            aux[field] = true
            openNotification('Algum campo informado na pessoa está inválido! Ele foi marcado em vermelho!', 'error')
        } else if (field.includes('contacts')) {
            openNotification('Algum campo informado em algum contato está inválido! Os contatos foram marcados em vermelho!', 'error')
            aux.contacts = true
        }

        setErrors(aux)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPerson({ ...person, [e.target.name]: e.target.value })
    }

    const handleDateChange = (value: Date | null) => {
        if (value) setPerson({ ...person, birthDate: value })
    }

    const handleContactChange = (contactIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const aux = { ...person }
        aux.contacts[contactIndex] = { ...aux.contacts[contactIndex], [e.target.name]: e.target.value }

        setPerson(aux)
    }

    const handleAddContact = () => {
        const aux = { ...person }
        aux.contacts.push({
            email: '',
            name: '',
            phoneNumber: '',
        })
        setPerson(aux)
    }

    const handleDeleteContact = (index: number) => {
        const aux = { ...person }
        aux.contacts.splice(index, 1)
        setPerson(aux)
    }

    const handleSave = () => {
        axios
            .post<Person>(`http://localhost:8080/person`, person)
            .then(() => {
                handleGoToHome()
            })
            .catch((err) => {
                const error = err as AxiosError<BadRequestResponse, BadRequestResponse>
                if (!error.response) return

                if (error.response.status === 400) {
                    const response = error.response

                    setNewError(response.data.field)
                }
            })
    }

    const handleGoToHome = () => {
        navigate('/')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '80%',
                    height: '10%',
                    backgroundColor: '#D6E3F8',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <IconButton onClick={handleGoToHome} sx={{ marginLeft: '20px', height: '50%', alignSelf: 'center', color: 'black' }}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                    <Typography sx={{ alignSelf: 'center', color: 'black', padding: '20px' }} variant="h4">
                        Inserir pessoa
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignSelf: 'center',
                        paddingRight: '20px',
                        gap: { xs: '5px', md: '20px' },
                        flexDirection: { xs: 'column-reverse', md: 'row' },
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#4CAF50',
                            alignSelf: 'center',
                            '&:hover': {
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                            },
                            gap: '5px',
                        }}
                        onClick={handleSave}
                    >
                        <CheckIcon></CheckIcon>
                        Salvar
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', height: '89%', width: '80%', backgroundColor: '#fff', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
                <CreatePersonForm
                    initialData={person}
                    onChange={handleChange}
                    handleDateChange={handleDateChange}
                    errors={errors}
                    setErrors={setErrors}
                    handleContactChange={handleContactChange}
                    handleAddContact={handleAddContact}
                    handleDeleteContact={handleDeleteContact}
                ></CreatePersonForm>
            </Box>
            <Snackbar open={notificationOpen} autoHideDuration={10000} onClose={closeSnackBar}>
                <Alert severity={alertType}>{alertMessage}</Alert>
            </Snackbar>
        </Box>
    )
}
