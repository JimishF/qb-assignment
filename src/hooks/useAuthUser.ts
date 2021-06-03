import { useSelector } from 'react-redux';
import { authUserSelector } from '../redux/selectors/index';
export function useAuthUser() {
    return useSelector(authUserSelector)
}