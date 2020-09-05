import React, { useCallback } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import { Container } from './styles';

const SearchBar: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date);
  }, []);

  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#004A82',
      },
    },
  });

  return (
    <Container>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            id="date-picker-inline"
            label="Data"
            format="dd/MM/yy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Container>
  );
};

export default SearchBar;
