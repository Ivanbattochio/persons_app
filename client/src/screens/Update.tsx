import { Key, useEffect, useState } from 'react'
import { Path, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'
import axios from 'axios'
import { Person } from '../models/Person'
import { PersonErrorsObject } from '../models/ErrorsObject'
import { UpdatePersonForm } from '../components/UpdatePersonForm'

interface Location extends Path {
    state: { id: string }
    key: Key
}

export const Update: React.FC = () => {
    const navigate = useNavigate()
    const location: () => Location = useLocation

    const locationProps = location()
    const personId = locationProps.state.id

    const [person, setPerson] = useState<Person>({
        id: '',
        name: '',
        email: '',
        birthDate: new Date(),
        ein: '',
        contacts: [],
    })

    const [errors, setErrors] = useState<PersonErrorsObject>({
        name: false,
        email: false,
        birthDate: false,
        ein: false,
        contacts: false,
    })

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!personId) navigate('/')

        setLoading(true)
        axios
            .get<Person>(`http://localhost:8080/person/${personId}`)
            .then((res) => {
                setPerson({ ...res.data, birthDate: new Date(res.data.birthDate) })
                console.log(res.data)
            })
            .finally(() => setLoading(false))
    }, [])

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
            id: '',
        })
        setPerson(aux)
    }

    const handleDeleteContact = (index: number) => {
        const aux = { ...person }
        aux.contacts.splice(index, 1)
        setPerson(aux)
    }

    const handleDelete = () => {}

    const handleSave = () => {
        navigate('/')
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
                        Atualizar pessoa
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
                            backgroundColor: '#9D5C63',
                            alignSelf: 'center',
                            '&:hover': {
                                backgroundColor: '#9D5C63',
                                color: '#fff',
                            },
                            gap: '5px',
                        }}
                        onClick={handleDelete}
                    >
                        <RemoveIcon></RemoveIcon>
                        Excluir
                    </Button>
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
                <UpdatePersonForm
                    initialData={person}
                    onChange={handleChange}
                    handleDateChange={handleDateChange}
                    errors={errors}
                    setErrors={setErrors}
                    handleContactChange={handleContactChange}
                    handleAddContact={handleAddContact}
                    handleDeleteContact={handleDeleteContact}
                ></UpdatePersonForm>
            </Box>
        </Box>
    )
}
