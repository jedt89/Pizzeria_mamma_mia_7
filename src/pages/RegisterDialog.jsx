import React, { useState, useContext } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { TbLock, TbMail } from 'react-icons/tb';
import { default as toast } from 'react-hot-toast';
import fields from '../models/Fields';
import { MainContext } from '../context/MainContext';
import { DialogContext } from '../context/DialogContext';

const RegisterDialog = () => {
  const { handleReturnToHome } = useContext(MainContext);
  const { registerDialogClose, registerDialogIsOpen, registerDialogOpenChange } = useContext(DialogContext);
  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [repeatPassError, setRepeatPassError] = useState('');
  const [registryError, setRegistryError] = useState('');
  const navigate = useNavigate();
  const {
    FIELD_EMPTY,
    REGISTRY_SUCCESSFULLY,
    MIN_PASS,
    NOT_EQUAL_PASS,
    EMPTY_FIELDS
  } = fields;

  const checkFormData = () => {
    if (userMail === '' || userPassword === '' || repeatPassword === '') {
      setRegistryError(EMPTY_FIELDS);
    } else if (userPassword !== repeatPassword) {
      setRegistryError(NOT_EQUAL_PASS);
    } else if (userPassword.length < 6) {
      setRegistryError(MIN_PASS);
    } else {
      registerDialogClose();
      clearModalData();
      handleReturnToHome();
      navigate('/');
      setTimeout(
        () =>
          toast.success(REGISTRY_SUCCESSFULLY, {
            position: 'top-right'
          }),
        100
      );
    }
  };

  const checkEmptyData = (value, type) => {
    let errorMessage = '';

    if (!value) {
      errorMessage = FIELD_EMPTY;
    } else {
      switch (type) {
        case 'pass':
          if (value.length < 6) {
            errorMessage = MIN_PASS;
          }
          break;
        case 'repeatPass':
          if (value !== userPassword) {
            errorMessage = NOT_EQUAL_PASS;
          }
          break;
        default:
          break;
      }
    }

    switch (type) {
      case 'email':
        setEmailError(errorMessage);
        break;
      case 'pass':
        setPassError(errorMessage);
        break;
      case 'repeatPass':
        setRepeatPassError(errorMessage);
        break;
      default:
        break;
    }
  };

  const clearModalData = () => {
    setUserMail('');
    setUserPassword('');
    setRepeatPassword('');
    setEmailError('');
    setPassError('');
    setRepeatPassError('');
    setRegistryError('');
  };

  return (
    <Modal
      isOpen={registerDialogIsOpen}
      onOpenChange={registerDialogOpenChange}
      onClose={() => {
        registerDialogClose();
        handleReturnToHome();
        navigate('/');
      }}
      isDismissable={false}
      isKeyboardDismissDisabled
      size='xs'
      backdrop='blur'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 modal-header'>
          Regístrate
        </ModalHeader>
        <ModalBody>
          <div className='card flex justify-content-center min-height-300'>
            <div className='flex flex-column gap-2rem width-100 min-height-200'>
              <div>
                <label>Correo electrónico</label>
                <Input
                  startContent={<TbMail />}
                  type='email'
                  variant='bordered'
                  isInvalid={!!emailError}
                  onChange={(e) => {
                    setRegistryError('');
                    setUserMail(e.target.value);
                    checkEmptyData(e.target.value, 'email');
                  }}
                  errorMessage={emailError}
                  className='modal-input'
                  color='warning'
                  radius='sm'
                />
              </div>
              <div>
                <label>Contraseña</label>
                <Input
                  startContent={<TbLock />}
                  type='password'
                  variant='bordered'
                  isInvalid={!!passError}
                  onChange={(e) => {
                    setRegistryError('');
                    setUserPassword(e.target.value);
                    checkEmptyData(e.target.value, 'pass');
                  }}
                  errorMessage={passError}
                  className='modal-input'
                  color='warning'
                  radius='sm'
                />
              </div>
              <div>
                <label>Repetir contraseña</label>
                <Input
                  startContent={<TbLock />}
                  type='password'
                  variant='bordered'
                  isInvalid={!!repeatPassError}
                  onChange={(e) => {
                    setRegistryError('');
                    setRepeatPassword(e.target.value);
                    checkEmptyData(e.target.value, 'repeatPass');
                  }}
                  errorMessage={repeatPassError}
                  className='modal-input'
                  color='warning'
                  radius='sm'
                />
              </div>
              {registryError && (
                <p className='validation-error'>{registryError}</p>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='flex-column align-items-center'>
            <div className='display-flex justify-center gap-1rem modal-buttons'>
              <Button
                onClick={() => {
                  registerDialogClose();
                  clearModalData();
                  handleReturnToHome();
                  navigate('/');
                }}
                variant='ghost'
                color='default'
              >
                Cancelar
              </Button>
              <Button onClick={checkFormData} variant='ghost' color='warning'>
                Aceptar
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterDialog;
