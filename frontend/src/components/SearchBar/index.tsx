import React, { useCallback, useState, ChangeEvent } from 'react';
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

interface ValueState {
  formattedValue: string;
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

const SearchBar: React.FC<SearchBarProps> = ({ color }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [service, setService] = useState('');
  const [value, setValue] = useState<ValueState>({
    formattedValue: '',
  });
  const [status, setStatus] = useState('');

  const sellers = [{ name: 'Christiane' }, { name: 'Tainara' }];

  const handleDateChange = useCallback((date: Date | null) => {
    setSelectedDate(date);
  }, []);

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

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

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
                id="input-with-icon-grid-company-name"
                label="Razão Social"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item>
              {companyName ? (
                <IconButton onClick={() => setCompanyName('')}>
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
                onChange={(e) => setService(e.target.value)}
              />
            </Grid>
            <Grid item>
              {service ? (
                <IconButton onClick={() => setService('')}>
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </Grid>
          </Grid>
        </Service>
        <Seller>
          <Autocomplete
            openText=""
            id="input-sellers"
            clearOnBlur={false}
            options={sellers}
            getOptionLabel={({ name }) => name}
            noOptionsText=""
            renderInput={(params) => <TextField {...params} label="Vendedor" />}
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
        </Seller>
        <Value>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                label="Valor"
                value={value.formattedValue}
                onChange={handleChangeValue}
                name="formattedValue"
                id="formatted-formattedValue-input"
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
              />
            </Grid>
            <Grid item>
              {value.formattedValue ? (
                <IconButton
                  onClick={() => {
                    setValue({
                      formattedValue: '',
                    });
                  }}
                >
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </Grid>
          </Grid>
        </Value>
        <Status value={!!status}>
          <FormControl className={formControl}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as string)}
            >
              <MenuItem value="">&nbsp;</MenuItem>
              <MenuItem value="Aprovado" style={{ justifyContent: 'center' }}>
                <FaCheckCircle className={faCheck} />
              </MenuItem>
              <MenuItem value="Aguardando" style={{ justifyContent: 'center' }}>
                <FaRegClock className={faRegClock} />
              </MenuItem>
              <MenuItem value="Encerrado" style={{ justifyContent: 'center' }}>
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
