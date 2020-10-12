import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import {
  ThemeProvider,
  createMuiTheme,
  TextField as OriginalTextField,
} from '@material-ui/core';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { FaTimes } from 'react-icons/fa';
import { FiArrowRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { isCNPJ, isCPF, isPhone, formatToCapitalized } from 'brazilian-values';
import isEmail from 'validator/es/lib/isEmail';
import { format } from 'date-fns';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { TextField } from 'unform-material-ui';
import InputMask, { Props as InputProps } from 'react-input-mask';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useOverlap } from '../../hooks/overlap';

import HeaderButton from '../HeaderButton';
import Order from '../Order';
import Button from '../Button';
import DisabledButton from '../DisabledButton';

import {
  NewOrderOverlap,
  Container,
  Content,
  AskTitle,
  WhatIsCompanyName,
  WhatIsCompanyCnpj,
  WhatIsCompanyCpf,
  WhatIsCompanyNameContact,
  WhatIsCompanyEmailContact,
  WhatIsCompanyMobilePhoneContact,
  WhatIsCompanyPhone,
  SubmitQuestionButton,
  Footer,
  Progress,
  ButtonsControl,
  ConfirmData,
  QuestionData,
  QuestionsContainer,
  AnswersContainer,
  SubmitFormButton,
} from './styles';

interface CompanyNameState {
  inputValue?: string;
  name: string;
}

interface InputData {
  companyCnpjData: string;
  companyCpfData: string;
  companyNameContactData: string;
  companyEmailContactData: string;
  companyPhoneData: string;
  companyMobilePhoneContactData: string;
}

interface NewOrderProps {
  color: string;
}

const NewOrder: React.FC<NewOrderProps> = ({ color }) => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [companyName, setCompanyName] = useState<CompanyNameState>(
    {} as CompanyNameState
  );
  const [companyCnpj, setCompanyCnpj] = useState('');
  const [companyCpf, setCompanyCpf] = useState('');
  const [companyNameContact, setCompanyNameContact] = useState('');
  const [companyEmailContact, setCompanyEmailContact] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyMobilePhoneContact, setCompanyMobilePhoneContact] = useState(
    ''
  );

  const [companyNameOpen, setCompanyNameOpen] = useState(true);
  const [companyCnpjOpen, setCompanyCnpjOpen] = useState(false);
  const [companyCpfOpen, setCompanyCpfOpen] = useState(false);
  const [companyNameContactOpen, setCompanyNameContactOpen] = useState(false);
  const [companyEmailContactOpen, setCompanyEmailContactOpen] = useState(false);
  const [companyPhoneOpen, setCompanyPhoneOpen] = useState(false);
  const [
    companyMobilePhoneContactOpen,
    setCompanyMobilePhoneContactOpen,
  ] = useState(false);
  const [confirmDataOpen, setConfirmDataOpen] = useState(false);

  const [counterAnswers, setCounterAnswers] = useState<string[]>([]);
  const [confirmDataHasOpened, setConfirmDataHasOpened] = useState(false);

  const { addToast } = useToast();
  const { user } = useAuth();
  const { newOrderOpen, overlapNewOrderOpen } = useOverlap();

  const companyCnpjRef = useRef<FormHandles>(null);
  const companyCpfRef = useRef<FormHandles>(null);
  const companyNameContactRef = useRef<FormHandles>(null);
  const companyEmailContactRef = useRef<FormHandles>(null);
  const companyPhoneRef = useRef<FormHandles>(null);
  const companyMobilePhoneContactRef = useRef<FormHandles>(null);

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
    },
  });

  const filter = createFilterOptions<CompanyNameState>();

  const companyNames: CompanyNameState[] = [
    {
      name: 'American Express',
    },
    {
      name: 'Anheuser-Busch InBev',
    },
    {
      name: 'Bank of America',
    },
    {
      name: 'Bank of Communications',
    },
    {
      name: 'Bank of Montreal',
    },
    {
      name: 'Bank of Nova Scotia',
    },
    {
      name: 'Berkshire Hathaway',
    },
    {
      name: 'Bristol-Myers Squibb',
    },
    {
      name: 'Brookfield Asset Management',
    },
    {
      name: 'Charter Communications',
    },
    {
      name: 'Cisco Systems',
    },
    {
      name: 'Commonwealth Bank',
    },
    {
      name: 'Costco Wholesale',
    },
    {
      name: 'Credit Agricole',
    },
    {
      name: 'CVS HealthNestlé',
    },
    {
      name: 'Dell Technologies',
    },
    {
      name: 'Deutsche Telekom',
    },
    {
      name: 'Duke Energy',
    },
    {
      name: 'General Electric',
    },
    {
      name: 'General Motors',
    },
    {
      name: 'Generali GroupVisa',
    },
    {
      name: 'GlaxoSmithKline',
    },
    {
      name: 'Goldman Sachs Group',
    },
    {
      name: 'HSBC Holdings',
    },
    {
      name: 'IberdrolaHon Hai Precision',
    },
    {
      name: 'Industrial Bank',
    },
    {
      name: 'Intesa Sanpaolo',
    },
    {
      name: 'Itaú Unibanco Holding',
    },
    {
      name: 'Japan Post Holdings',
    },
    {
      name: 'Johnson & Johnson',
    },
    {
      name: 'JPMorgan Chase',
    },
    {
      name: 'Lloyds Banking Group',
    },
    {
      name: 'Lockheed Martin',
    },
    {
      name: 'LVMH Moët Hennessy Louis Vuitton',
    },
    {
      name: 'MetLifeSumitomo Mitsui Financial',
    },
    {
      name: 'Mitsubishi UFJ Financial',
    },
    {
      name: 'Morgan Stanley',
    },
    {
      name: 'Nippon Telegraph & Tel',
    },
    {
      name: 'PetrobrasProcter & Gamble',
    },
    {
      name: 'Ping An Insurance Group',
    },
    {
      name: 'PNC Financial Services',
    },
    {
      name: 'Prudential Financial',
    },
    {
      name: 'Raytheon Technologies',
    },
    {
      name: 'Reliance Industries',
    },
    {
      name: 'Roche Holding',
    },
    {
      name: 'Samsung Electronics',
    },
    {
      name: 'Saudi Arabian Oil Company',
    },
    {
      name: 'Shanghai Pudong Development',
    },
    {
      name: 'SinopecChevron',
    },
    {
      name: 'Taiwan Semiconductor',
    },
    {
      name: 'TD Bank Group',
    },
    {
      name: 'Tencent HoldingsIBM',
    },
    {
      name: 'Toyota Motor',
    },
    {
      name: 'UnileverCountry Garden Holdings',
    },
    {
      name: 'United Parcel Service',
    },
    {
      name: 'UnitedHealth Group',
    },
    {
      name: 'Verizon CommunicationsRoyal Dutch Shell',
    },
    {
      name: 'Volkswagen Group',
    },
    {
      name: 'Walgreens Boots Alliance',
    },
    {
      name: 'Westpac Banking Group',
    },
    {
      name: 'Zurich Insurance Group',
    },
  ];

  const handleShowData = useCallback(() => {
    setCompanyNameOpen(false);
    setCompanyCnpjOpen(false);
    setCompanyCpfOpen(false);
    setCompanyNameContactOpen(false);
    setCompanyEmailContactOpen(false);
    setCompanyMobilePhoneContactOpen(false);
    setCompanyPhoneOpen(false);
    setConfirmDataOpen(true);
  }, []);

  const handleSubmitCompanyName = useCallback(() => {
    if (companyName.name) {
      setCompanyNameOpen(!companyNameOpen); // Close question opened
      setCompanyCnpjOpen(!companyCnpjOpen); // Open next question

      if (!counterAnswers.find((e) => e === 'companyName')) {
        setCounterAnswers((state) => [...state, 'companyName']); // Set as answered
      }
    }

    if (
      confirmDataHasOpened &&
      (counterAnswers.includes('companyCnpj') ||
        counterAnswers.includes('companyCpf')) &&
      counterAnswers.includes('companyNameContact') &&
      counterAnswers.includes('companyEmailContact') &&
      (counterAnswers.includes('companyPhone') ||
        counterAnswers.includes('companyMobilePhoneContact'))
    ) {
      handleShowData();
    }
  }, [
    companyName.name,
    confirmDataHasOpened,
    counterAnswers,
    companyNameOpen,
    companyCnpjOpen,
    handleShowData,
  ]);

  const handleSubmitCompanyCnpj = useCallback(
    ({ companyCnpjData }: InputData) => {
      if (companyCnpjData) {
        if (isCNPJ(companyCnpjData)) {
          companyCnpjRef.current?.setErrors({});
          setCompanyCnpjOpen(!companyCnpjOpen); // Close question opened
          setCompanyNameContactOpen(!companyNameContactOpen); // Open next question

          setCompanyCnpj(companyCnpjData);

          if (!counterAnswers.find((e) => e === 'companyCnpj')) {
            setCounterAnswers((state) => [...state, 'companyCnpj']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            counterAnswers.includes('companyNameContact') &&
            counterAnswers.includes('companyEmailContact') &&
            (counterAnswers.includes('companyPhone') ||
              counterAnswers.includes('companyMobilePhoneContact'))
          ) {
            handleShowData();
          }
        } else {
          companyCnpjRef.current?.setErrors({
            companyCnpjData: 'CNPJ inválido',
          });
        }
      } else {
        setCompanyCnpjOpen(!companyCnpjOpen); // Close question opened
        setCompanyCpfOpen(!companyCpfOpen); // Close question opened

        setCompanyCnpj('');
        setCounterAnswers((state) => state.filter((e) => e !== 'companyCnpj'));
      }
    },
    [
      companyCnpjOpen,
      companyCpfOpen,
      companyNameContactOpen,
      confirmDataHasOpened,
      counterAnswers,
      handleShowData,
    ]
  );

  const handleSubmitCompanyCpf = useCallback(
    ({ companyCpfData }: InputData) => {
      if (companyCpfData) {
        if (isCPF(companyCpfData)) {
          companyCpfRef.current?.setErrors({});
          setCompanyCpfOpen(!companyCpfOpen); // Close question opened
          setCompanyNameContactOpen(!companyNameContactOpen); // Open next question

          setCompanyCpf(companyCpfData);

          if (!counterAnswers.find((e) => e === 'companyCpf')) {
            setCounterAnswers((state) => [...state, 'companyCpf']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            counterAnswers.includes('companyNameContact') &&
            counterAnswers.includes('companyEmailContact') &&
            (counterAnswers.includes('companyPhone') ||
              counterAnswers.includes('companyMobilePhoneContact'))
          ) {
            handleShowData();
          }
        } else {
          companyCpfRef.current?.setErrors({
            companyCpfData: 'CPF inválido',
          });
        }
      } else {
        companyCpfRef.current?.setErrors({
          companyCpfData: 'Favor preencher um CPF, ou CNPJ',
        });
        setCompanyCpf('');
        setCounterAnswers((state) => state.filter((e) => e !== 'companyCpf'));
      }
    },
    [
      companyCpfOpen,
      companyNameContactOpen,
      confirmDataHasOpened,
      counterAnswers,
      handleShowData,
    ]
  );

  const handleSubmitCompanyNameContact = useCallback(
    ({ companyNameContactData }: InputData) => {
      if (companyNameContactData) {
        companyNameContactRef.current?.setErrors({});
        setCompanyNameContactOpen(!companyNameContactOpen); // Close question opened
        setCompanyEmailContactOpen(!companyEmailContactOpen); // Open next question

        setCompanyNameContact(
          formatToCapitalized(companyNameContactData, {
            trimTrailingWhiteSpaces: false,
          })
        );

        if (!counterAnswers.find((e) => e === 'companyNameContact')) {
          setCounterAnswers((state) => [...state, 'companyNameContact']); // Set as answered
        }

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('companyName') &&
          (counterAnswers.includes('companyCnpj') ||
            counterAnswers.includes('companyCpf')) &&
          counterAnswers.includes('companyEmailContact') &&
          (counterAnswers.includes('companyPhone') ||
            counterAnswers.includes('companyMobilePhoneContact'))
        ) {
          handleShowData();
        }
      } else {
        companyNameContactRef.current?.setErrors({
          companyNameContactData: 'Favor preencher um nome',
        });
      }
    },
    [
      companyNameContactOpen,
      companyEmailContactOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitCompanyEmailContact = useCallback(
    ({ companyEmailContactData }: InputData) => {
      if (companyEmailContactData) {
        if (isEmail(companyEmailContactData)) {
          companyEmailContactRef.current?.setErrors({});
          setCompanyEmailContactOpen(!companyEmailContactOpen); // Close question opened
          setCompanyPhoneOpen(!companyPhoneOpen); // Open next question

          setCompanyEmailContact(companyEmailContactData);

          if (!counterAnswers.find((e) => e === 'companyEmailContact')) {
            setCounterAnswers((state) => [...state, 'companyEmailContact']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            (counterAnswers.includes('companyCnpj') ||
              counterAnswers.includes('companyCpf')) &&
            counterAnswers.includes('companyNameContact') &&
            (counterAnswers.includes('companyPhone') ||
              counterAnswers.includes('companyMobilePhoneContact'))
          ) {
            handleShowData();
          }
        } else {
          companyEmailContactRef.current?.setErrors({
            companyEmailContactData: 'Favor preencher um e-mail válido',
          });
        }
      } else {
        companyEmailContactRef.current?.setErrors({
          companyEmailContactData: 'Favor preencher um e-mail',
        });
      }
    },
    [
      companyEmailContactOpen,
      companyPhoneOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitCompanyPhone = useCallback(
    ({ companyPhoneData }: InputData) => {
      if (companyPhoneData.length > 1) {
        if (isPhone(companyPhoneData)) {
          companyPhoneRef.current?.setErrors({});
          setCompanyPhoneOpen(!companyPhoneOpen); // Close question opened
          setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Open next question

          setCompanyPhone(companyPhoneData);

          if (!counterAnswers.find((e) => e === 'companyPhone')) {
            setCounterAnswers((state) => [...state, 'companyPhone']); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            (counterAnswers.includes('companyCnpj') ||
              counterAnswers.includes('companyCpf')) &&
            counterAnswers.includes('companyNameContact') &&
            counterAnswers.includes('companyEmailContact')
          ) {
            handleShowData();
          }
        } else {
          companyPhoneRef.current?.setErrors({
            companyPhoneData: 'Favor preencher um telefone fixo válido',
          });
        }
      } else if (companyMobilePhoneContact) {
        setCompanyPhone('');
        setCounterAnswers((state) => state.filter((e) => e !== 'companyPhone'));

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('companyName') &&
          (counterAnswers.includes('companyCnpj') ||
            counterAnswers.includes('companyCpf')) &&
          counterAnswers.includes('companyNameContact') &&
          counterAnswers.includes('companyEmailContact')
        ) {
          handleShowData();
        }
      } else {
        setCompanyPhoneOpen(!companyPhoneOpen); // Close question opened
        setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Open next question

        setCompanyPhone('');
        setCounterAnswers((state) => state.filter((e) => e !== 'companyPhone'));
      }
    },
    [
      companyMobilePhoneContact,
      companyPhoneOpen,
      companyMobilePhoneContactOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitCompanyMobilePhoneContact = useCallback(
    ({ companyMobilePhoneContactData }: InputData) => {
      if (companyMobilePhoneContactData.length > 1) {
        if (isPhone(companyMobilePhoneContactData)) {
          companyMobilePhoneContactRef.current?.setErrors({});
          setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Close question opened
          setConfirmDataOpen(!confirmDataOpen); // Open next question

          setConfirmDataHasOpened(true);

          setCompanyMobilePhoneContact(companyMobilePhoneContactData);

          if (!counterAnswers.find((e) => e === 'companyMobilePhoneContact')) {
            setCounterAnswers((state) => [
              ...state,
              'companyMobilePhoneContact',
            ]); // Set as answered
          }

          if (
            confirmDataHasOpened &&
            counterAnswers.includes('companyName') &&
            (counterAnswers.includes('companyCnpj') ||
              counterAnswers.includes('companyCpf')) &&
            counterAnswers.includes('companyNameContact') &&
            counterAnswers.includes('companyEmailContact')
          ) {
            handleShowData();
          }
        } else {
          companyMobilePhoneContactRef.current?.setErrors({
            companyMobilePhoneContactData:
              'Favor preencher um telefone celular válido',
          });
        }
      } else if (companyPhone) {
        setCompanyMobilePhoneContact('');
        setCounterAnswers((state) =>
          state.filter((e) => e !== 'companyMobilePhoneContact')
        );

        if (
          confirmDataHasOpened &&
          counterAnswers.includes('companyName') &&
          (counterAnswers.includes('companyCnpj') ||
            counterAnswers.includes('companyCpf')) &&
          counterAnswers.includes('companyNameContact') &&
          counterAnswers.includes('companyEmailContact')
        ) {
          handleShowData();
        } else {
          companyMobilePhoneContactRef.current?.setErrors({});
          setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen); // Close question opened
          setConfirmDataOpen(!confirmDataOpen); // Open next question

          setConfirmDataHasOpened(true);
        }
      } else {
        setCompanyMobilePhoneContact('');
        setCounterAnswers((state) =>
          state.filter((e) => e !== 'companyMobilePhoneContact')
        );
        companyMobilePhoneContactRef.current?.setErrors({
          companyMobilePhoneContactData:
            'Favor preencher um telefone celular, ou fixo',
        });
      }
    },
    [
      companyPhone,
      companyMobilePhoneContactOpen,
      confirmDataOpen,
      counterAnswers,
      confirmDataHasOpened,
      handleShowData,
    ]
  );

  const handleSubmitForm = useCallback(() => {
    try {
      addToast({
        type: 'success',
        description: 'Pedido criado com sucesso!',
      });
      setConfirmDataOpen(false);
      setOrderOpen(true);
    } catch (err) {
      addToast({
        type: 'error',
        description: 'Erro inesperado ao criar o pedido',
      });
    }
  }, [addToast]);

  const handleChangeToPreviousQuestion = useCallback(() => {
    if (
      companyNameOpen &&
      companyName.name &&
      (companyCnpj || companyCpf) &&
      companyNameContact &&
      companyEmailContact &&
      (companyPhone || companyMobilePhoneContact)
    ) {
      setCompanyNameOpen(!companyNameOpen);
      setConfirmDataOpen(!confirmDataOpen);
    }
    if (companyCnpjOpen) {
      setCompanyCnpjOpen(!companyCnpjOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
    if (companyCpfOpen && !companyCpf) {
      setCompanyCpfOpen(!companyCpfOpen);
      setCompanyCnpjOpen(!companyCnpjOpen);
    }
    if (companyCpfOpen && companyCpf) {
      setCompanyCpfOpen(!companyCpfOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
    if (companyNameContactOpen && companyCnpj) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyCnpjOpen(!companyCnpjOpen);
    }
    if (companyNameContactOpen && companyCpf) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyCpfOpen(!companyCpfOpen);
    }
    if (companyEmailContactOpen) {
      setCompanyEmailContactOpen(!companyEmailContactOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyPhoneOpen) {
      setCompanyPhoneOpen(!companyPhoneOpen);
      setCompanyEmailContactOpen(!companyEmailContactOpen);
    }
    if (companyMobilePhoneContactOpen) {
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
      setCompanyPhoneOpen(!companyPhoneOpen);
    }
    if (confirmDataOpen) {
      setConfirmDataOpen(!confirmDataOpen);
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
    }
  }, [
    companyNameOpen,
    companyName.name,
    companyCnpj,
    companyCpf,
    companyNameContact,
    companyEmailContact,
    companyPhone,
    companyMobilePhoneContact,
    companyCnpjOpen,
    companyCpfOpen,
    companyNameContactOpen,
    companyEmailContactOpen,
    companyPhoneOpen,
    companyMobilePhoneContactOpen,
    confirmDataOpen,
  ]);

  const handleChangeToNextQuestion = useCallback(() => {
    if (companyNameOpen && companyName.name && companyCnpj) {
      setCompanyNameOpen(!companyNameOpen);
      setCompanyCnpjOpen(!companyCnpjOpen);
    }
    if (companyNameOpen && companyName.name && companyCpf) {
      setCompanyNameOpen(!companyNameOpen);
      setCompanyCpfOpen(!companyCpfOpen);
    }
    if (companyCnpjOpen && !companyCnpj) {
      setCompanyCnpjOpen(!companyCnpjOpen);
      setCompanyCpfOpen(!companyCpfOpen);
    }
    if (companyCnpjOpen && companyCnpj) {
      setCompanyCnpjOpen(!companyCnpjOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyCpfOpen && companyCpf) {
      setCompanyCpfOpen(!companyCpfOpen);
      setCompanyNameContactOpen(!companyNameContactOpen);
    }
    if (companyNameContactOpen && companyNameContact) {
      setCompanyNameContactOpen(!companyNameContactOpen);
      setCompanyEmailContactOpen(!companyEmailContactOpen);
    }
    if (companyEmailContactOpen && companyEmailContact) {
      setCompanyEmailContactOpen(!companyEmailContactOpen);
      setCompanyPhoneOpen(!companyPhoneOpen);
    }
    if (companyPhoneOpen) {
      setCompanyPhoneOpen(!companyPhoneOpen);
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
    }
    if (
      companyMobilePhoneContactOpen &&
      (companyMobilePhoneContact || companyPhoneOpen)
    ) {
      setCompanyMobilePhoneContactOpen(!companyMobilePhoneContactOpen);
      setConfirmDataOpen(!confirmDataOpen);
    }
    if (confirmDataOpen && companyName.name) {
      setConfirmDataOpen(!confirmDataOpen);
      setCompanyNameOpen(!companyNameOpen);
    }
  }, [
    companyNameOpen,
    companyName.name,
    companyCnpjOpen,
    companyCpfOpen,
    companyCpf,
    companyCnpj,
    companyNameContactOpen,
    companyNameContact,
    companyEmailContactOpen,
    companyEmailContact,
    companyPhoneOpen,
    companyMobilePhoneContactOpen,
    companyMobilePhoneContact,
    confirmDataOpen,
  ]);

  // This function clear answer when field is empty
  useEffect(() => {
    if (!companyName.name) {
      setCounterAnswers((state) => state.filter((e) => e !== 'companyName'));
    }
  }, [companyName]);

  // Monitor keyboard events
  const eventKeyPress = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'PageUp') {
        handleChangeToPreviousQuestion();
      }
      if (event.key === 'PageDown') {
        handleChangeToNextQuestion();
      }
      if (event.key === 'Enter' && confirmDataOpen) {
        handleSubmitForm();
      }
    },
    [
      confirmDataOpen,
      handleChangeToPreviousQuestion,
      handleChangeToNextQuestion,
      handleSubmitForm,
    ]
  );
  document.onkeydown = eventKeyPress;

  const InputWithCNPJMask = useCallback((props: InputProps): JSX.Element => {
    return (
      <InputMask
        {...props}
        mask="99.999.999/9999-99"
        maskChar={null}
        style={{ border: 'none' }}
      />
    );
  }, []);

  const InputWithCPFMask = useCallback((props: InputProps): JSX.Element => {
    return (
      <InputMask
        {...props}
        mask="999.999.999-99"
        maskChar={null}
        style={{ border: 'none' }}
      />
    );
  }, []);

  const InputWithPhoneMask = useCallback((props: InputProps): JSX.Element => {
    return (
      <InputMask
        {...props}
        mask="(99) 9999-9999"
        maskChar={null}
        style={{ border: 'none' }}
      />
    );
  }, []);

  const InputWithMobilePhoneMask = useCallback(
    (props: InputProps): JSX.Element => {
      return (
        <InputMask
          {...props}
          mask="(99) 9 9999-9999"
          maskChar={null}
          style={{ border: 'none' }}
        />
      );
    },
    []
  );

  return (
    <NewOrderOverlap>
      {orderOpen && (
        <Order
          color={color}
          data={{
            id: '31',
            date: new Date(),
            formattedDate: format(new Date(), 'dd/MM/yyyy'),
            companyName: companyName.name,
            seller: user.name,
            companyCpfCnpj: companyCnpj || companyCpf,
            companyNameContact,
            companyEmailContact,
            companyMobilePhoneContact,
            companyPhone,
          }}
          from="Comercial"
        />
      )}
      <HeaderButton
        show={newOrderOpen}
        handleClick={(e) => overlapNewOrderOpen(!e)}
        type="button"
        icon={FaTimes}
        color={color}
      />
      <ThemeProvider theme={defaultMaterialTheme}>
        <Container>
          <Content color={color}>
            {companyNameOpen && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="individual-form"
              >
                <WhatIsCompanyName companyNameOpen={companyNameOpen}>
                  <AskTitle>
                    <div>
                      <span>1</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual a <strong>razão social</strong> do cliente?
                    </div>
                  </AskTitle>
                  <Autocomplete
                    openText=""
                    clearText=""
                    clearOnBlur={false}
                    value={companyName}
                    onChange={(event, newCompanyName) => {
                      if (newCompanyName && newCompanyName.inputValue) {
                        setCompanyName({
                          name: newCompanyName.inputValue,
                        });
                      } else if (newCompanyName) {
                        setCompanyName(newCompanyName);
                      }
                      if (!newCompanyName) {
                        setCompanyName({} as CompanyNameState);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(
                        options,
                        params
                      ) as CompanyNameState[];

                      if (params.inputValue !== '') {
                        filtered.push({
                          inputValue: params.inputValue,
                          name: `Adicionar ${params.inputValue}`,
                        });
                      }

                      return filtered;
                    }}
                    options={companyNames}
                    noOptionsText=""
                    getOptionLabel={({ name, inputValue }) => {
                      if (inputValue) {
                        return inputValue;
                      }
                      return name;
                    }}
                    renderInput={(params) => (
                      <OriginalTextField
                        name="companyName"
                        autoFocus
                        autoComplete="off"
                        placeholder="Escreva ou selecione uma opção"
                        helperText=" "
                        {...params}
                      />
                    )}
                    renderOption={({ name }, { inputValue }) => {
                      const matches = match(name, inputValue);
                      const parts = parse(name, matches);

                      return (
                        <div>
                          {parts.map(({ highlight, text }) => (
                            <span
                              key={text}
                              style={{ fontWeight: highlight ? 700 : 400 }}
                            >
                              {text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />
                  {companyName.name ? (
                    <SubmitQuestionButton>
                      <Button onClick={handleSubmitCompanyName}>
                        Continuar
                      </Button>
                      <div>
                        <span>
                          pressione <strong>ENTER</strong>
                        </span>
                        <span>↵</span>
                      </div>
                    </SubmitQuestionButton>
                  ) : (
                    <DisabledButton>Continuar</DisabledButton>
                  )}
                </WhatIsCompanyName>
              </form>
            )}
            {companyCnpjOpen && (
              <Form
                ref={companyCnpjRef}
                className="individual-form"
                onSubmit={handleSubmitCompanyCnpj}
              >
                <WhatIsCompanyCnpj companyCnpjOpen={companyCnpjOpen}>
                  <AskTitle>
                    <div>
                      <span>2</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>CNPJ</strong> do cliente?
                    </div>
                  </AskTitle>
                  <TextField
                    id="companyCnpj-input"
                    name="companyCnpjData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyCnpj}
                    InputProps={{
                      inputComponent: InputWithCNPJMask as any,
                    }}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsCompanyCnpj>
              </Form>
            )}
            {companyCpfOpen && (
              <Form
                ref={companyCpfRef}
                className="individual-form"
                onSubmit={handleSubmitCompanyCpf}
              >
                <WhatIsCompanyCpf companyCpfOpen={companyCpfOpen}>
                  <AskTitle>
                    <div>
                      <span>2</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>CPF</strong> do cliente?
                    </div>
                  </AskTitle>
                  <TextField
                    id="companyCpf-input"
                    name="companyCpfData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyCpf}
                    InputProps={{
                      inputComponent: InputWithCPFMask as any,
                    }}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsCompanyCpf>
              </Form>
            )}
            {companyNameContactOpen && (
              <Form
                ref={companyNameContactRef}
                onSubmit={handleSubmitCompanyNameContact}
                className="individual-form"
              >
                <WhatIsCompanyNameContact
                  companyNameContactOpen={companyNameContactOpen}
                >
                  <AskTitle>
                    <div>
                      <span>3</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>nome</strong> do responsável?
                    </div>
                  </AskTitle>
                  <TextField
                    id="companyNameContact-input"
                    name="companyNameContactData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyNameContact}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsCompanyNameContact>
              </Form>
            )}
            {companyEmailContactOpen && (
              <Form
                ref={companyEmailContactRef}
                onSubmit={handleSubmitCompanyEmailContact}
                className="individual-form"
              >
                <WhatIsCompanyEmailContact
                  companyEmailContactOpen={companyEmailContactOpen}
                >
                  <AskTitle>
                    <div>
                      <span>4</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>e-mail</strong> do cliente?
                    </div>
                  </AskTitle>
                  <TextField
                    id="companyEmailContact-input"
                    name="companyEmailContactData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyEmailContact}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsCompanyEmailContact>
              </Form>
            )}
            {companyPhoneOpen && (
              <Form
                ref={companyPhoneRef}
                onSubmit={handleSubmitCompanyPhone}
                className="individual-form"
              >
                <WhatIsCompanyPhone companyPhoneOpen={companyPhoneOpen}>
                  <AskTitle>
                    <div>
                      <span>5</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>telefone fixo</strong> do cliente?
                    </div>
                  </AskTitle>
                  <TextField
                    id="companyPhone-input"
                    name="companyPhoneData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyPhone}
                    InputProps={{
                      inputComponent: InputWithPhoneMask as any,
                    }}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsCompanyPhone>
              </Form>
            )}
            {companyMobilePhoneContactOpen && (
              <Form
                ref={companyMobilePhoneContactRef}
                onSubmit={handleSubmitCompanyMobilePhoneContact}
                className="individual-form"
              >
                <WhatIsCompanyMobilePhoneContact
                  companyMobilePhoneContactOpen={companyMobilePhoneContactOpen}
                >
                  <AskTitle>
                    <div>
                      <span>6</span>
                      <FiArrowRight />
                    </div>
                    <div>
                      Qual o <strong>telefone celular</strong> do responsável?
                    </div>
                  </AskTitle>
                  <TextField
                    id="companyMobilePhoneContact-input"
                    name="companyMobilePhoneContactData"
                    autoFocus
                    autoComplete="off"
                    placeholder="Digite aqui"
                    defaultValue={companyMobilePhoneContact}
                    InputProps={{
                      inputComponent: InputWithMobilePhoneMask as any,
                    }}
                    helperText=" "
                  />
                  <SubmitQuestionButton>
                    <Button>Continuar</Button>
                    <div>
                      <span>
                        pressione <strong>ENTER</strong>
                      </span>
                      <span>↵</span>
                    </div>
                  </SubmitQuestionButton>
                </WhatIsCompanyMobilePhoneContact>
              </Form>
            )}
          </Content>
          <Footer>
            <Progress color={color} counterAnswers={counterAnswers.length}>
              <span>{counterAnswers.length} de 6 respondidas</span>
              <div className="progress-bar" />
              <div className="bg-progress-bar" />
            </Progress>
            <ButtonsControl color={color}>
              <button type="button" onClick={handleChangeToPreviousQuestion}>
                <FiChevronUp />
              </button>
              <button type="button" onClick={handleChangeToNextQuestion}>
                <FiChevronDown />
              </button>
            </ButtonsControl>
          </Footer>
          {confirmDataOpen && (
            <ConfirmData confirmDataOpen={confirmDataOpen} color={color}>
              <QuestionData>
                <QuestionsContainer>
                  <p>Razão Social: </p>
                  {companyCnpj && <p>CNPJ: </p>}
                  {companyCpf && <p>CPF: </p>}
                  <p>Nome do responsável: </p>
                  <p>E-mail do responsável: </p>
                  {companyPhone && <p>Telefone da empresa: </p>}
                  {companyMobilePhoneContact && (
                    <p>Telefone do responsável: </p>
                  )}
                </QuestionsContainer>
                <AnswersContainer>
                  <p>{companyName.name}</p>
                  <p>{companyCnpj || companyCpf}</p>
                  <p>{companyNameContact}</p>
                  <p>{companyEmailContact}</p>
                  {companyPhone && <p>{companyPhone}</p>}
                  {companyMobilePhoneContact && (
                    <p>{companyMobilePhoneContact}</p>
                  )}
                </AnswersContainer>
              </QuestionData>
              <SubmitFormButton>
                <Button onClick={handleSubmitForm}>Criar pedido</Button>
                <div>
                  <span>
                    pressione <strong>ENTER</strong>
                  </span>
                  <span>↵</span>
                </div>
              </SubmitFormButton>
            </ConfirmData>
          )}
        </Container>
      </ThemeProvider>
    </NewOrderOverlap>
  );
};

export default NewOrder;
