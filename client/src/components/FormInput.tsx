import { Box, TextField } from '@mui/material'

type InputProps = {
    name: string
    value: string | number | readonly string[] | undefined
    labelText: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: boolean
    type: string
}

export const FormInput: React.FC<InputProps> = ({ name, value, labelText, handleChange, error, type }) => {
    return (
        <Box sx={{ paddingTop: '8px' }}>
            <TextField label={labelText} type={type} name={name} error={error} value={value} onChange={handleChange} />
        </Box>
    )
}
