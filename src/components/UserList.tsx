import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { usersSelector } from '../redux/store/selectors'

function UserList(): ReactElement {
    const user = useSelector( usersSelector )
    
    return (
        <div>
            { JSON.stringify(user) }
        </div>
    )
}

export default UserList
