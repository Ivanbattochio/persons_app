import { PersonRow } from './Person'

export type TableProps = {
    isDeleteButtonActive: boolean
    mainCheckBox: boolean
    loading: boolean
    tableData: PersonRow[]
    currentCardQuantity: number
    currentPage: number
    totalQty: number
    handleDelete: () => void
    setTableData: React.Dispatch<React.SetStateAction<PersonRow[]>>
    setMainCheckBox: React.Dispatch<React.SetStateAction<boolean>>
    handlePageChange: (page: number) => void
    handleSizeChange: (page: number) => void
}
