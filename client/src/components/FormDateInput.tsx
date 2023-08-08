import { Box } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

type DateInputProps = {
    type: string
    value: Date
    labelText: string
    handleChange: (value: Date | null) => void
}

export const FormDateInput: React.FC<DateInputProps> = ({ value, labelText, handleChange }) => {
    console.log(value)

    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker sx={{ width: '241px' }} label={labelText} value={value} onChange={handleChange} />
                </DemoContainer>
            </LocalizationProvider>
        </Box>
    )
}
