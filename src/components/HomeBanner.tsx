import { Button, Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
type Props = {
    head?: string
    para?: string
}

const HomeBanner = ({head, para}: Props) => {
    const router = useRouter()
  return (
    <Stack spacing={3} padding={8}  >
        <Typography variant='h2'>{head}</Typography>
        <Typography variant='subtitle1'>{para}</Typography>
        <Button sx={{ backgroundColor: 'black', width: "50%", borderRadius: "20px" }} variant="contained" onClick={()=>router.push('/products')}>Shop Now</Button>
        <Stack spacing={4} divider={<Divider orientation='vertical' />} direction={{xs: 'column', md: 'row'}}>
            <Stack direction='column'>
                <Typography variant='h2'>200+</Typography>
                <Typography variant='subtitle1'>International Brands</Typography>
            </Stack>
            <Stack direction='column'>
                <Typography variant='h2'>2,000+</Typography>
                <Typography variant='subtitle1'>High Quality Products</Typography>
            </Stack>
            <Stack direction='column'>
                <Typography variant='h2'>30,000+</Typography>
                <Typography variant='subtitle1'>Happy Customers</Typography>
            </Stack>
        </Stack>
    </Stack>
  )
}

export default HomeBanner
