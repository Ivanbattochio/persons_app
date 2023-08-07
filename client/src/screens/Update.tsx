import { Key, useEffect, useState } from 'react'
import { InsertPersonProps } from '../models/InsertPersonComponent'
import { Path, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, IconButton, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'
import axios from 'axios'
import { Person } from '../models/Person'
interface Location extends Path {
    state: { id: string }
    key: Key
}

export const Update: React.FC<InsertPersonProps> = () => {
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

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get<Person>(`http://localhost:8080/person/${personId}`)
            .then((res) => {
                setPerson(res.data)
                console.log(res.data)
            })
            .finally(() => setLoading(false))
    }, [])
    const handleChange = (e) => {
        setPerson({ ...person, [e.target.name]: e.target.value })
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
                    <Typography sx={{ alignSelf: 'center', color: 'black', padding: '20px' }} variant="h3">
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
            <Box
                sx={{ display: 'flex', height: '89%', width: '80%', backgroundColor: '#fff', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}
            ></Box>
        </Box>
    )
}
