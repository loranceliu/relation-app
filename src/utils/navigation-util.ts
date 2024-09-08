import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef =  createNavigationContainerRef<ParamList>();

export const navigate = (name: any, params?: any) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}
  