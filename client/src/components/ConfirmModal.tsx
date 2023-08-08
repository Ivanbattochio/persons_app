import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type InputProps = {
    open: boolean
    message: string
    setOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
    handleConfirmDelete: () => void
    handleCancelDelete: () => void
}

export const ConfirmModal: React.FC<InputProps> = ({ open, handleCancelDelete, handleConfirmDelete, message, setOpenConfirmModal }) => {
    const handleClose = () => {
        setOpenConfirmModal(false)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Confirmação</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Continuar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
