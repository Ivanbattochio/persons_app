import axios from 'axios'
import { useEffect, useState, useMemo } from 'react'
import { Person, PersonRow } from './models/Person'
import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Table,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Typography,
} from '@mui/material'
import Pagination from '@mui/material/Pagination'
import RemoveIcon from '@mui/icons-material/Remove'
const cardsQtyOptions = [
    { key: '5', value: '5', text: '5' },
    { key: '10', value: '10', text: '10' },
    { key: '15', value: '15', text: '15' },
    { key: '20', value: '20', text: '20' },
    { key: '50', value: '50', text: '50' },
    { key: '100', value: '100', text: '100' },
]

function App() {
    const [loading, setLoading] = useState(false)
    const [tableData, setTableData] = useState<PersonRow[]>([])

    const [totalQty, setTotalQty] = useState<number>(0)

    const [currentPage, setCurrentPage] = useState<number>(1)

    const [currentCardQuantity, setCurrentCardQuantity] = useState<number>(20)

    const [mainCheckBox, setMainCheckBox] = useState<boolean>(false)

    useEffect(() => {
        fetchData(20, 1)
    }, [])

    const isDeleteButtonActive = useMemo(() => {
        return tableData.some((row) => row.selected)
    }, [tableData])

    const fetchData = (size: number, page: number) => {
        setLoading(true)
        axios
            .get<Person[]>('http://localhost:8080/person/paginated', {
                params: {
                    page: page - 1,
                    size: size,
                },
            })
            .then((res) => {
                setTableData(
                    res.data.map((person) => {
                        return {
                            id: person.id,
                            name: person.name,
                            email: person.email,
                            birthDate: person.birthDate,
                            ein: person.ein,
                            selected: false,
                        }
                    })
                )

                setTotalQty(parseInt(res.headers['x-total-count'], 10))
            })
            .finally(() => setLoading(false))
    }

    const handleDelete = async () => {
        setLoading(true)
        for (const row of tableData) {
            if (row.selected) {
                await axios.delete<Person[]>(`http://localhost:8080/person/${row.id}`)
            }
        }
        console.log('deletou tudo')
        fetchData(currentCardQuantity, 0)
        setCurrentPage(1)
    }

    const handleSizeChange = (quantity: number) => {
        if (quantity && quantity !== currentCardQuantity) {
            setCurrentCardQuantity(quantity)
            setCurrentPage(1)
            fetchData(quantity, 0)
        }
    }

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setCurrentPage(page)
            fetchData(currentCardQuantity, page)
        }
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
                <Typography sx={{ alignSelf: 'center', color: 'black', padding: '20px' }} variant="h3">
                    Pessoas
                </Typography>
                <Box sx={{ display: 'flex', alignSelf: 'center', paddingRight: '20px', gap: '20px' }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#9D5C63',
                            '&:hover': {
                                backgroundColor: '#9D5C63',
                            },
                            display: 'flex',
                            gap: '5px',
                        }}
                        disabled={!isDeleteButtonActive}
                        onClick={handleDelete}
                    >
                        <RemoveIcon></RemoveIcon>
                        Deletar
                    </Button>
                    <Button variant="contained">Adicionar</Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '80%' }}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Data de nascimento</TableCell>
                                <TableCell align="right">CPF</TableCell>
                                <TableCell align="right">
                                    <Checkbox
                                        checked={mainCheckBox}
                                        onClick={() => {
                                            const aux = [...tableData]
                                            aux.forEach((row) => (row.selected = !mainCheckBox))
                                            setTableData(aux)
                                            setMainCheckBox(!mainCheckBox)
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => {
                                        console.log(row.id)
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.ein}</TableCell>
                                    <TableCell align="right">
                                        <Checkbox
                                            checked={row.selected}
                                            onClick={() => {
                                                const aux = [...tableData]
                                                aux.forEach((thisRow) => {
                                                    if (thisRow.id === row.id) {
                                                        row.selected = !thisRow.selected
                                                    }
                                                })
                                                setTableData(aux)
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box className="pagination" display={'flex'} flexDirection={['column', 'column', 'row']}>
                <ToggleButtonGroup
                    value={currentCardQuantity}
                    exclusive
                    onChange={(e: React.MouseEvent<HTMLElement>, val: string) => {
                        handleSizeChange(parseInt(val))
                    }}
                >
                    {cardsQtyOptions.map(({ key, value }) => (
                        <ToggleButton disabled={loading} value={value} key={key} name={value} onChange={(e, val) => handleSizeChange(val)}>
                            {value}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>

                <Pagination
                    disabled={loading}
                    shape="rounded"
                    page={currentPage}
                    count={Math.ceil(totalQty / currentCardQuantity)}
                    onChange={(e, page) => {
                        handlePageChange(page)
                    }}
                />
            </Box>
        </Box>
    )
}

export default App
