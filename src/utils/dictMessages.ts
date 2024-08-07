export const DatabaseErrors = {
  '23505': 'unique',
};

export const UsersAPIErrors = {
  unique: {
    message: 'Este correo electrónico ya se encuentra registrado',
    errorCode: 1,
  },
  notFound: {
    message: 'No se ha encontrado un usuario con esas credenciales',
    errorCode: 2,
  },
  notFoundEmail: {
    message: 'No se ha encontrado un usuario con este correo eléctronico',
    errorCode: 3,
  },
  errorSendEmail: {
    message:
      'Hemos tenido problemas al enviar el correo, por favor intenta más tarde',
    errorCode: 4,
  },
  codeNotPair: {
    message: 'El código ingresado es érroneo',
    errorCode: 5,
  },
};

export const UsersAPIMessages = {
  delete: {
    message: 'El usaurio fue eliminado correctamente',
    msgCode: 3,
  },
};
