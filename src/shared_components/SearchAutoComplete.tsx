'use client'

import { TextField, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type ProdType = {
  name: string;
  id: string;
};

const SearchAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<ProdType[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue.trim()) {
        fetchOptions(inputValue);
      } else {
        setOptions([]);
      }
    }, 500); 
    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

 const fetchOptions = async (query: string) => {
  try {
    setLoading(true);
    const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
    
    const products: ProdType[] = response.data.products.map((prod: {id: number, title: string}) => ({
      id: String(prod.id),
      name: prod.title,
    }));

    setOptions(products); 
  } catch (error) {
    console.error("Search failed", error);
    setOptions([]); 
  } finally {
    setLoading(false);
  }
};

  return (
    <Autocomplete
    //   freeSolo
      options={options}
      getOptionLabel={(option) => option.name}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
     onChange={(event, value) => {
         if (typeof value === 'object' && value !== null) {
            router.push(`/item?product=${value.id}`);
        }
}}

      renderInput={(params) => (
        <TextField
          {...params}
          label="Search products"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{ width: 300 }}
    />
  );
};

export default SearchAutocomplete;
