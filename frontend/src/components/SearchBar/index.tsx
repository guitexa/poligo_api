import React, { useCallback } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  TextField,
  IconButton,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as themeAugmentation from '@material-ui/lab/themeAugmentation';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { FaCheckCircle, FaRegClock, FaTimes } from 'react-icons/fa';
import NumberFormat from 'react-number-format';

import { useSearch } from '../../hooks/search';

import {
  Container,
  Date,
  CompanyName,
  Service,
  Professional,
  Value,
  Status,
} from './styles';

interface SearchBarProps {
  color: string;
  from: string;
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps): JSX.Element {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(value) => {
        onChange({
          target: {
            name: props.name,
            value: value.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      fixedDecimalScale
      prefix="R$ "
      decimalScale={2}
    />
  );
}

const SearchBar: React.FC<SearchBarProps> = ({ color, from }) => {
  const sellers = [{ name: 'Christiane' }, { name: 'Tainara' }];
  const technicals = [{ name: 'Leandro' }, { name: 'Aline' }];

  const {
    selectedDate,
    selectedDeliveryDate,
    companyName,
    service,
    seller,
    technical,
    value,
    status,
    searchDate,
    searchDeliveryDate,
    searchCompanyName,
    searchService,
    searchSeller,
    searchTechnical,
    searchValue,
    searchStatus,
  } = useSearch();

  const handleDateChange = useCallback(
    (date: Date | null) => {
      searchDate(date);
    },
    [searchDate]
  );

  const handleDeliveryDateChange = useCallback(
    (date: Date | null) => {
      searchDeliveryDate(date);
    },
    [searchDeliveryDate]
  );

  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
    overrides: {
      MuiAutocomplete: {
        option: {
          '&:hover': {
            backgroundColor: color,
            color: '#fff',
          },
          '&[data-focus="true"]': {
            backgroundColor: color,
            color: '#fff',
            '&:hover': {
              backgroundColor: color,
              color: '#fff',
            },
          },
          '&[aria-selected="true"]': {
            backgroundColor: color,
            color: '#fff',
            '&:hover': {
              backgroundColor: color,
              color: '#fff',
            },
          },
        },
      },
      MuiMenuItem: {
        root: {
          '&:hover': {
            backgroundColor: color,
            '&& svg': {
              color: '#fff',
            },
          },
          '&$selected': {
            backgroundColor: color,
            '&& svg': {
              color: '#fff',
            },
            '&:hover': {
              backgroundColor: color,
              '&& svg': {
                color: '#fff',
              },
            },
          },
        },
      },
    },
  });

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
      },
      faCheck: {
        color: '#1b914f',
      },
      faRegClock: {
        color: '#999',
      },
      faTimes: {
        color: '#f00',
      },
    })
  );

  const { formControl, faCheck, faRegClock, faTimes } = useStyles();

  const handleChangeSeller = useCallback(
    (event, selectedSeller) => {
      searchSeller(selectedSeller !== null ? selectedSeller.name : '');
    },
    [searchSeller]
  );

  const handleChangeTechnical = useCallback(
    (event, selectedTechnical) => {
      searchTechnical(selectedTechnical !== null ? selectedTechnical.name : '');
    },
    [searchTechnical]
  );

  return (
    <Container color={color}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Date isFilled={!!selectedDate}>
          <Grid container alignItems="flex-end">
            <Grid item>
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
            </Grid>
            <Grid item>
              {selectedDate && (
                <IconButton
                  className="close-button"
                  onClick={() => searchDate(null)}
                >
                  <Close />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Date>
        <CompanyName>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                id="input-with-icon-grid-company-name"
                label="Razão Social"
                value={companyName}
                onChange={(e) => searchCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item>
              {companyName ? (
                <IconButton onClick={() => searchCompanyName('')}>
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
                id="input-with-icon-grid-service"
                label="Serviço"
                value={service}
                onChange={(e) => searchService(e.target.value)}
              />
            </Grid>
            <Grid item>
              {service ? (
                <IconButton onClick={() => searchService('')}>
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </Grid>
          </Grid>
        </Service>
        {(from === 'Comercial' || from === 'Billing') && (
          <>
            <Professional>
              <Autocomplete
                openText=""
                clearText=""
                clearOnBlur={false}
                id="input-sellers"
                options={sellers || []}
                getOptionLabel={({ name }) => name}
                onChange={handleChangeSeller}
                noOptionsText=""
                renderInput={(params) => (
                  <TextField {...params} label="Vendedor" value={seller} />
                )}
                renderOption={({ name }, { inputValue }) => {
                  const matches = match(name, inputValue);
                  const parts = parse(name, matches);

                  return (
                    <div>
                      {parts.map(({ highlight, text }) => (
                        <span
                          key={text}
                          style={{
                            fontWeight: highlight ? 700 : 400,
                          }}
                        >
                          {text}
                        </span>
                      ))}
                    </div>
                  );
                }}
              />
            </Professional>
            <Value>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <TextField
                    label="Valor"
                    value={value}
                    onChange={(e) => searchValue(e.target.value)}
                    name="formattedValue"
                    id="formatted-formattedValue-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                    }}
                  />
                </Grid>
                <Grid item>
                  {value ? (
                    <IconButton onClick={() => searchValue('')}>
                      <Close />
                    </IconButton>
                  ) : (
                    <Search />
                  )}
                </Grid>
              </Grid>
            </Value>
          </>
        )}
        {from === 'TechnicalArea' && (
          <>
            <Professional>
              <Autocomplete
                openText=""
                clearText=""
                clearOnBlur={false}
                id="input-technical"
                options={technicals || []}
                getOptionLabel={({ name }) => name}
                onChange={handleChangeTechnical}
                noOptionsText=""
                renderInput={(params) => (
                  <TextField {...params} label="Executante" value={technical} />
                )}
                renderOption={({ name }, { inputValue }) => {
                  const matches = match(name, inputValue);
                  const parts = parse(name, matches);

                  return (
                    <div>
                      {parts.map(({ highlight, text }) => (
                        <span
                          key={text}
                          style={{
                            fontWeight: highlight ? 700 : 400,
                          }}
                        >
                          {text}
                        </span>
                      ))}
                    </div>
                  );
                }}
              />
            </Professional>
            <Date isFilled={!!selectedDeliveryDate}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="dialog"
                      id="date-picker-inline"
                      label="Entrega"
                      format="dd/MM/yyyy"
                      value={selectedDeliveryDate}
                      onChange={handleDeliveryDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>
                  {selectedDeliveryDate && (
                    <IconButton
                      className="close-button"
                      onClick={() => searchDeliveryDate(null)}
                    >
                      <Close />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </Date>
          </>
        )}
        <Status value={!!status}>
          <FormControl className={formControl}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={(e) => searchStatus(e.target.value as string)}
            >
              <MenuItem value="">&nbsp;</MenuItem>
              <MenuItem value="Aprovado" style={{ justifyContent: 'center' }}>
                <FaCheckCircle className={faCheck} />
              </MenuItem>
              <MenuItem value="Aguardando" style={{ justifyContent: 'center' }}>
                <FaRegClock className={faRegClock} />
              </MenuItem>
              <MenuItem value="Cancelado" style={{ justifyContent: 'center' }}>
                <FaTimes className={faTimes} />
              </MenuItem>
            </Select>
          </FormControl>
        </Status>
      </ThemeProvider>
    </Container>
  );
};

export default SearchBar;
