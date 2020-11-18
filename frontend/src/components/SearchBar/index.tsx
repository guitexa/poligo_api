import React, { useCallback, useEffect, useState } from 'react';
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
import { HiOutlineRefresh } from 'react-icons/hi';
import { RiDraftFill } from 'react-icons/ri';
import { IoMdThumbsDown } from 'react-icons/io';

import { useSearch } from '../../hooks/search';

import { useAuth, User } from '../../hooks/auth';

import {
  Container,
  Date,
  CompanyName,
  Product,
  Professional,
  Value,
  Status,
} from './styles';
import api from '../../services/api';

interface SearchBarProps {
  color: string;
  from: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ color, from }) => {
  const [sellers, setSellers] = useState<User[]>([]);
  const [technicals, setTechnicals] = useState<User[]>([]);

  const {
    selectedDate,
    selectedDeliveryDate,
    company_name,
    product,
    seller,
    technical,
    total_value,
    status_order,
    status_delivery,
    status_billing,
    searchDate,
    searchDeliveryDate,
    searchCompanyName,
    searchProduct,
    searchSeller,
    searchTechnical,
    searchTotalValue,
    searchStatusOrder,
    searchStatusDelivery,
    searchStatusBilling,
  } = useSearch();

  const { checkToken } = useAuth();

  useEffect(() => {
    checkToken();
    api.get<User[]>('/users').then((response) => {
      setSellers(
        response.data.filter((user) => user.permissions === 'Comercial')
      );
      setTechnicals(
        response.data.filter((user) => user.permissions === 'TechnicalArea')
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const searchBarMaterialTheme = createMuiTheme({
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
        color: '#555',
      },
      riDraftFill: {
        color: '#999',
      },
      faTimes: {
        color: '#f00',
      },
      ioThumbsDown: {
        color: '#c00000',
      },
      hiRefresh: {
        color: '#000',
      },
    })
  );

  const {
    formControl,
    faCheck,
    faRegClock,
    riDraftFill,
    faTimes,
    ioThumbsDown,
    hiRefresh,
  } = useStyles();

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
      <ThemeProvider theme={searchBarMaterialTheme}>
        <Date isFilled={!!selectedDate}>
          <Grid container alignItems="flex-end">
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  autoOk
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
                value={company_name}
                onChange={(e) => searchCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item>
              {company_name ? (
                <IconButton onClick={() => searchCompanyName('')}>
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </Grid>
          </Grid>
        </CompanyName>
        <Product>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                id="input-with-icon-grid-product"
                label="Serviço"
                value={product}
                onChange={(e) => searchProduct(e.target.value)}
              />
            </Grid>
            <Grid item>
              {product ? (
                <IconButton onClick={() => searchProduct('')}>
                  <Close />
                </IconButton>
              ) : (
                <Search />
              )}
            </Grid>
          </Grid>
        </Product>
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
                    value={total_value}
                    onChange={(e) => searchTotalValue(e.target.value)}
                    name="formattedValue"
                    id="formatted-formattedValue-input"
                  />
                </Grid>
                <Grid item>
                  {total_value ? (
                    <IconButton onClick={() => searchTotalValue('')}>
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
            <Status value={!!status_delivery}>
              <FormControl className={formControl}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status_delivery}
                  onChange={(e) => {
                    searchStatusDelivery(e.target.value as string);
                  }}
                >
                  <MenuItem value="">&nbsp;</MenuItem>
                  <MenuItem
                    value="Agendado"
                    style={{ justifyContent: 'center' }}
                  >
                    <FaRegClock className={faRegClock} />
                  </MenuItem>
                  <MenuItem
                    value="Execução"
                    style={{ justifyContent: 'center' }}
                  >
                    <HiOutlineRefresh className={hiRefresh} />
                  </MenuItem>
                  <MenuItem
                    value="Concluído"
                    style={{ justifyContent: 'center' }}
                  >
                    <FaCheckCircle className={faCheck} />
                  </MenuItem>
                  <MenuItem
                    value="Cancelado"
                    style={{ justifyContent: 'center' }}
                  >
                    <FaTimes className={faTimes} />
                  </MenuItem>
                </Select>
              </FormControl>
            </Status>
          </>
        )}
        {from === 'Billing' && (
          <Status value={!!status_billing}>
            <FormControl className={formControl}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status_billing}
                onChange={(e) => searchStatusBilling(e.target.value as string)}
              >
                <MenuItem value="">&nbsp;</MenuItem>
                <MenuItem
                  value="Aguardando"
                  style={{ justifyContent: 'center' }}
                >
                  <FaRegClock className={faRegClock} />
                </MenuItem>
                <MenuItem value="Faturado" style={{ justifyContent: 'center' }}>
                  <FaCheckCircle className={faCheck} />
                </MenuItem>
                <MenuItem
                  value="Cancelado"
                  style={{ justifyContent: 'center' }}
                >
                  <FaTimes className={faTimes} />
                </MenuItem>
              </Select>
            </FormControl>
          </Status>
        )}
        {from === 'Comercial' && (
          <Status value={!!status_order}>
            <FormControl className={formControl}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status_order}
                onChange={(e) => searchStatusOrder(e.target.value as string)}
              >
                <MenuItem value="">&nbsp;</MenuItem>
                <MenuItem value="Rascunho" style={{ justifyContent: 'center' }}>
                  <RiDraftFill className={riDraftFill} />
                </MenuItem>
                <MenuItem
                  value="Aguardando"
                  style={{ justifyContent: 'center' }}
                >
                  <FaRegClock className={faRegClock} />
                </MenuItem>
                <MenuItem
                  value="Reprovado"
                  style={{ justifyContent: 'center' }}
                >
                  <IoMdThumbsDown className={ioThumbsDown} />
                </MenuItem>
                <MenuItem value="Aprovado" style={{ justifyContent: 'center' }}>
                  <FaCheckCircle className={faCheck} />
                </MenuItem>
                <MenuItem
                  value="Cancelado"
                  style={{ justifyContent: 'center' }}
                >
                  <FaTimes className={faTimes} />
                </MenuItem>
              </Select>
            </FormControl>
          </Status>
        )}
      </ThemeProvider>
    </Container>
  );
};

export default SearchBar;
