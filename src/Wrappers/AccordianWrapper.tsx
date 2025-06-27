'use client'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemIcon,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { categoryFilters } from '../shared_features/categoryFilters' // Adjust path as needed

const AccordianWrapper = () => {
  const [price, setPrice] = useState<number[]>([50, 200])

  const searchParams = useSearchParams()
  const category = searchParams.get('category') || ''

  const dynamicFilters = categoryFilters[category] || {}

  const [selectedRating, setSelectedRating] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(event.target.value)
    console.log(`Selected rating: ${event.target.value} and above`)
  }


  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Customer Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <RadioGroup value={selectedRating} onChange={handleChange}>
      {[0, 1, 2, 3].map((item) => (
        <ListItemButton key={item}>
          <ListItemIcon>
            <FormControlLabel
              value={(4 - item).toString()}
              control={<Radio />}
              label={`${4 - item} and above`}
            />
          </ListItemIcon>
        </ListItemButton>
      ))}
    </RadioGroup>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={price}
            onChange={(_, newValue) => setPrice(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={500}
          />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption">₹{price[0]}</Typography>
            <Typography variant="caption">₹{price[1]}</Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {Object.entries(dynamicFilters).map(([filterType, options], i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{filterType}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {options.map((option, idx) => (
                <Chip
                  key={idx}
                  label={option}
                  onClick={() => {}}
                  variant="outlined"
                  clickable
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default AccordianWrapper
