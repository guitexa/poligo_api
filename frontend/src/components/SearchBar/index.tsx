import React, { useCallback, useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  createMuiTheme,
  TextField,
  IconButton,
  InputLabel,
  Select,
  FormControl,
  Grid,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Search, Close } from '@material-ui/icons';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Date,
  CompanyName,
  Service,
  Seller,
  Value,
  Status,
} from './styles';

interface SearchBarProps {
  color: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ color }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [companyNameValue, setCompanyNameValue] = useState('');
  const [serviceValue, setServiceValue] = useState('');
  const [valueValue, setValueValue] = useState('');

  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date);
  }, []);

  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    })
  );

  const classes = useStyles();

  const handleValueChange = useCallback((num: number) => {
    setValueValue(formatValue(num));
  }, []);

  return (
    <Container color={color}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Date>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              id="date-picker-inline"
              label="Data"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Date>
        <CompanyName>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Razão Social"
                value={companyNameValue}
                onChange={(e) => setCompanyNameValue(e.target.value)}
              />
            </Grid>
            <Grid item>
              {companyNameValue ? (
                <IconButton onClick={() => setCompanyNameValue('')}>
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </Grid>
          </Grid>
        </CompanyName>
        <Service>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Serviço"
                value={serviceValue}
                onChange={(e) => setServiceValue(e.target.value)}
              />
            </Grid>
            <Grid item>
              {serviceValue ? (
                <IconButton onClick={() => setServiceValue('')}>
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </Grid>
          </Grid>
        </Service>
        <Seller>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-native-select">Vendedor</InputLabel>
            <Select native defaultValue="" id="grouped-native-select">
              <option aria-label="None" value="" />
              <option value={1}>Miriam Wagner</option>
              <option value={2}>Bradley Wilkerson</option>
              <option value={3}>Virginia Andrews</option>
              <option value={4}>Kelly Snyder</option>
            </Select>
          </FormControl>
        </Seller>
        <Value>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Valor"
                value={valueValue}
                onChange={(e) => handleValueChange(Number(e.target.value))}
              />
            </Grid>
            <Grid item>
              {valueValue ? (
                <IconButton onClick={() => setValueValue('')}>
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </Grid>
          </Grid>
        </Value>
        <Status>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-native-select">Status</InputLabel>
            <Select native defaultValue="" id="grouped-native-select">
              <option aria-label="None" value="" />
              <option value={1}>Aprovado</option>
              <option value={2}>Aguardando</option>
              <option value={3}>Encerrado</option>
            </Select>
          </FormControl>
        </Status>
      </ThemeProvider>
    </Container>
  );
};

export default SearchBar;
