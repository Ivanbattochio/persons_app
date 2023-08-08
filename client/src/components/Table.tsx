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
    IconButton,
    LinearProgress,
    Stack,
} from '@mui/material'
import { ModeEdit } from '@mui/icons-material'
import Pagination from '@mui/material/Pagination'
import RemoveIcon from '@mui/icons-material/Remove'
import CheckIcon from '@mui/icons-material/Check'
import { TableProps } from '../models/TableComponent'
import { Link, useNavigate } from 'react-router-dom'
const cardsQtyOptions = [
    { key: '5', value: '5', text: '5' },
    { key: '10', value: '10', text: '10' },
    { key: '15', value: '15', text: '15' },
    { key: '20', value: '20', text: '20' },
    { key: '50', value: '50', text: '50' },
    { key: '100', value: '100', text: '100' },
]

export const TableComponent: React.FC<TableProps> = ({
    isDeleteButtonActive,
    handleDelete,
    mainCheckBox,
    setTableData,
    setMainCheckBox,
    tableData,
    loading,
    currentCardQuantity,
    currentPage,
    totalQty,
    handlePageChange,
    handleSizeChange,
}) => {
    const navigate = useNavigate()
    console.log(loading)

    const handleUpdate = (id: string) => {
        navigate('/update', { state: { id: id } })
    }

    return (
        <>
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
                <Typography sx={{ alignSelf: 'center', color: 'black', padding: '50px', fontFamily: 'sans-serif' }} variant="h4">
                    Pessoas
                </Typography>
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
                        Excluir
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#4CAF50',
                            '&:hover': {
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                            },
                            gap: '5px',
                        }}
                        component={Link}
                        to="/insert"
                    >
                        <CheckIcon></CheckIcon>
                        Adicionar
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '80%', height: '80%' }}>
                <TableContainer component={Paper} style={{ maxHeight: '100%', borderRadius: '0px' }}>
                    <Table aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow
                                sx={{
                                    '& th': {
                                        color: 'rgba(96, 96, 96)',
                                        backgroundColor: '#7EC8E3',
                                    },
                                }}
                            >
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Data de nascimento</TableCell>
                                <TableCell align="right">CPF</TableCell>
                                <TableCell align="right"></TableCell>
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
                        <TableBody sx={{ maxHeight: '500px', marginBottom: '150px', borderRadius: '0px' }}>
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
                                        <IconButton onClick={() => handleUpdate(row.id)}>
                                            <ModeEdit color="info" />
                                        </IconButton>
                                    </TableCell>
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

            <Stack sx={{ width: '80%' }}>{loading && <LinearProgress color="success" />}</Stack>

            <Box
                className="pagination"
                display={'flex'}
                sx={{
                    backgroundColor: '#fff',
                    width: '80%',
                    height: '80px',
                    borderBottomRightRadius: '5px',
                    borderBottomLeftRadius: '5px',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    borderTop: '1px solid',
                    borderColor: '#1C3144',
                }}
            >
                <ToggleButtonGroup
                    value={currentCardQuantity}
                    exclusive
                    onChange={(e: React.MouseEvent<HTMLElement>, val: string) => {
                        handleSizeChange(parseInt(val))
                    }}
                    sx={{ marginRight: '20px' }}
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
        </>
    )
}
