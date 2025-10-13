
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export function LanguageSelector() {
  return (
    <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth sx={{ color: 'black' }} >
        <NativeSelect sx={{ color: 'white' }}>
          <option>English</option>
          <option>Arabic</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
