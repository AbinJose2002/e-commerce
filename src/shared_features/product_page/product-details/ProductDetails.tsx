'use client'

import { ProductDetailsType } from '@/app/item/page'
import {
  Box,
  Rating,
  Tab,
  Tabs,
  Typography,
  Stack,
  Divider,
  Grid,
} from '@mui/material'
import React, { useState } from 'react'

const TabPanel = (props: {
  children?: React.ReactNode
  index: number
  value: number
}) => {
  const { children, value, index } = props
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  )
}

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

type Props = {
    prodDet: ProductDetailsType
}

const ProductDetails = ({prodDet}: Props ) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="product detail tabs">
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
          <Tab label="Return Policy" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography variant="subtitle1" gutterBottom>
          {prodDet.description}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>Brand:</strong> {prodDet.brand}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>SKU:</strong> {prodDet.sku}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>Category:</strong> {prodDet.category}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>Weight:</strong> {prodDet.weight}g
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>Dimensions:</strong> {prodDet.dimensions.width} x {prodDet.dimensions.height} x {prodDet.dimensions.depth} cm
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>Availability:</strong> {prodDet.availabilityStatus}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>Shipping Info:</strong> {prodDet.shippingInformation}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          <strong>Warranty:</strong> {prodDet.warrantyInformation}
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={1}>
        {prodDet.reviews.length === 0 ? (
          <Typography>No reviews yet.</Typography>
        ) : (
            <Stack>
              <Typography>Reviews ({prodDet.reviews.length})</Typography>
            <Grid container spacing={2}>
  {prodDet.reviews.map((review, idx) => (
    <Grid size={{xs: 12, sm: 6, md: 4}} key={idx}>
      <Box
        p={2}
        borderRadius={2}
        border="1px solid #ccc"
        boxShadow={1}
        sx={{ backgroundColor: '#fff' }}
      >
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={review.rating} readOnly size="small" />
            <Typography variant="body2" fontWeight="bold">
              {review.reviewerName}
            </Typography>
            <Typography variant="body2" color="success.main">
              ✔
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {new Date(review.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>

          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            “{review.comment}”
          </Typography>

          <Divider sx={{ mt: 1 }} />
        </Stack>
      </Box>
    </Grid>
  ))}
</Grid>
          </Stack>
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography>{prodDet.returnPolicy}</Typography>
      </TabPanel>
    </Box>
  )
}

export default ProductDetails
