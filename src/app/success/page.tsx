import { Box, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import success from '../../../public/success.gif'

const page = () => {
  return (
    <Box width={.4} margin={'auto'} sx={{ borderRadius: '20px'}}>
        <Paper elevation={2} sx={{ borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', flexDirection: 'column'}}>
            <Image src={success} width={100} height={100} alt={'success-icon'}/>
            <Typography variant='h3' textAlign='center'>You order is been placed successfully</Typography>
        </Paper>
    </Box>
  )
}

export default page
