import { AirportShuttle, DoubleArrow, LocationPin } from '@mui/icons-material'
import { Chip, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import shoe from '../../public/shoe.webp'
import Image from 'next/image'

const OrderCard = () => {
  return (
    <Paper elevation={10} sx={{padding: '16px', borderRadius:'20px'}} >
        <Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack>
                    <Typography variant='caption'>Order Id#</Typography>
                    <Typography variant='h6'>123456</Typography>
                </Stack>
                <Stack spacing={1} direction={'row'}>
                    <Chip label={'Estimated Arrival: 28 may 2025'}></Chip>
                    <Chip label={'On Deliver'} color='success'></Chip>
                </Stack>
            </Stack>
        </Stack>
        <Stack>
            <Stack spacing={1} direction={'row'} justifyContent={'space-between'}>
                <Chip icon={<AirportShuttle/>} label={'Kottayam, Kerala'}></Chip>
                <DoubleArrow />
                <Chip icon={<LocationPin/>} label={'Trivandrum, Kerala'}></Chip>
            </Stack>
        </Stack>
        <Stack justifyContent={'space-around'} direction={'row'} spacing={1} sx={{border: '1px solid black', borderRadius: '20px', padding: '8px'}}>
            <Stack direction={'row'} spacing={3}>
                <Image src={shoe} alt={'image'} width={80} height={80} />
                <Stack>
                    <Typography variant='subtitle2'>Nike AirMax Systm</Typography>
                    <Typography variant='subtitle2'>Rs 15800/-</Typography>
                    <Typography variant='caption'>Size: 24</Typography>
                </Stack>
            </Stack>
            <Stack direction={'row'} spacing={3}>
                <Image src={shoe} alt={'image'} width={80} height={80} />
                <Stack>
                    <Typography variant='subtitle2'>Nike AirMax Systm</Typography>
                    <Typography variant='subtitle2'>Rs 15800/-</Typography>
                    <Typography variant='caption'>Size: 24</Typography>
                </Stack>
            </Stack>
        </Stack>
    </Paper>
  )
}

export default OrderCard
