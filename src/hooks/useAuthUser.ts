import { useSelector } from 'react-redux';
import { authUserSelector } from '../redux/selectors/index';
export function useAuthUser() {
    const user =  useSelector(authUserSelector)
    return user as any
}