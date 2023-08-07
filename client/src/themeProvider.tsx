import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme({
    components: {
        // Name of the component
        MuiPaginationItem: {
            styleOverrides: {
                // Name of the slot
                root: {
                    fontStyle: 'italic',
                    fontWeight: 600,
                },
            },
        },
    },
    typography: {
        fontFamily: ['Nunito', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
        subtitle1: {
            fontSize: 12,
        },
        body1: {
            fontWeight: 600,
        },
        button: {
            fontStyle: 'italic',
            fontWeight: 600,
        },
    },
})

export default function Theme({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
