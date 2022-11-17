import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const LocalStorageAccessTokenKey = 'access_token';

const saveAuthToken = (token?: string) => {
  window.localStorage.setItem(LocalStorageAccessTokenKey, token || '');
};

const readAuthToken = () => {
  return window.localStorage.getItem(LocalStorageAccessTokenKey) || '';
};

enum AuthActionType {
  UPDATE_TOKEN = 'UPDATE_TOKEN',
  SET_TOKEN = 'SET_TOKEN',
  LOGOUT = 'LOGOUT',
}

type AuthReducerStateType = {
  token?: string;
  loaded?: boolean;
};

type AuthReducerActionType = {
  action: AuthActionType;
  payload?: AuthReducerStateType;
};

type AuthContextType = AuthReducerStateType & {
  dispatch?: Dispatch<AuthReducerActionType>;
};

const AuthReducer: Reducer<AuthReducerStateType, AuthReducerActionType> = (
  state,
  action
) => {
  switch (action.action) {
    case AuthActionType.UPDATE_TOKEN:
      saveAuthToken(action.payload?.token);
      return { ...state, token: action.payload?.token };
    case AuthActionType.SET_TOKEN: {
      saveAuthToken(action.payload?.token);
      return {
        ...state,
        token: action.payload?.token,
        loaded: action.payload?.loaded,
      };
    }
    case AuthActionType.LOGOUT:
      saveAuthToken('');
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType>({
  token: '',
  loaded: false,
});

export const Authprovider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    token: '',
    loaded: false,
  });

  useEffect(() => {
    const token = readAuthToken();
    dispatch({
      action: AuthActionType.SET_TOKEN,
      payload: { token, loaded: true },
    });
  }, []);

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === LocalStorageAccessTokenKey) {
        dispatch({
          action: AuthActionType.SET_TOKEN,
          payload: { token: event.newValue || '', loaded: true },
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const { dispatch, ...rest } = useContext(AuthContext);

  const login = (token: string) => {
    if (dispatch) {
      dispatch({ action: AuthActionType.UPDATE_TOKEN, payload: { token } });
    }
  };

  const logout = () => {
    if (dispatch) {
      dispatch({ action: AuthActionType.LOGOUT });
    }
  };

  return {
    ...rest,
    login,
    logout,
  };
}
