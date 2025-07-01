'use client';

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
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { categoryFilters } from '../shared_features/categoryFilters'; // Adjust path as needed

const AccordianWrapper = () => {
  const [price, setPrice] = useState<number[]>([0, 100000]);
  const [selectedRating, setSelectedRating] = useState<string>('');
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const router = useRouter();

  const dynamicFilters = categoryFilters[category] || {};

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRating(event.target.value);
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Set rating and price
    if (selectedRating) params.set('rating', selectedRating);
    params.set('minPrice', price[0].toString());
    params.set('maxPrice', price[1].toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Customer Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <RadioGroup value={selectedRating} onChange={handleRatingChange}>
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
            min={10} step={200} max={100000}
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

      <Button
        variant={"contained"}
          fullWidth
          sx={{ mt: 3, borderRadius: '20px', textTransform: 'none', fontWeight: 'bold' }}
        color="primary"
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default AccordianWrapper;
