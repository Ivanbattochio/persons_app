import { TableComponent } from '../components/Table'
import { Box } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Person, PersonRow } from '../models/Person'
export const Home: React.FC = () => {
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
            <TableComponent
                isDeleteButtonActive={isDeleteButtonActive}
                mainCheckBox={mainCheckBox}
                tableData={tableData}
                loading={loading}
                currentCardQuantity={currentCardQuantity}
                currentPage={currentPage}
                totalQty={totalQty}
                handleDelete={handleDelete}
                setTableData={setTableData}
                setMainCheckBox={setMainCheckBox}
                handlePageChange={handlePageChange}
                handleSizeChange={handleSizeChange}
            ></TableComponent>
        </Box>
    )
}
