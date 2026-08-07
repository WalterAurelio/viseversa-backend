export const PRODUCT = {
  TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
    MIN_LENGTH_MESSAGE: 'El título debe tener al menos 3 caracteres',
    MAX_LENGTH_MESSAGE: 'El título no puede exceder 100 caracteres'
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
    MIN_LENGTH_MESSAGE: 'La descripción debe tener al menos 10 caracteres',
    MAX_LENGTH_MESSAGE: 'La descripción no puede exceder 1000 caracteres'
  }
};

export const USER = {
  EMAIL: {
    INVALID_MESSAGE: 'Por favor proporciona un email válido',
    REGEX: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  /* CONTRASEÑA: {
    MIN_LENGTH: 6,
    MIN_LENGTH_MESSAGE: 'La contraseña debe tener al menos 6 caracteres'
  } */
  NOMBRE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    MIN_LENGTH_MESSAGE: 'El nombre es requerido',
    MAX_LENGTH_MESSAGE: 'El nombre no puede exceder 100 caracteres'
  },
  APELLIDO: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    MIN_LENGTH_MESSAGE: 'El apellido es requerido',
    MAX_LENGTH_MESSAGE: 'El apellido no puede exceder 100 caracteres'
  },
  NOMBRE_USUARIO: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    MIN_LENGTH_MESSAGE: 'El nombre de usuario debe tener al menos 3 caracteres',
    MAX_LENGTH_MESSAGE: 'El nombre de usuario no puede exceder 30 caracteres'
  }
};
