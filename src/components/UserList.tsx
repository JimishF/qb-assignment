import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { usersSelector } from '../redux/selectors'

function UserList(): ReactElement {
    const user = useSelector( usersSelector )
    
    return (
        <div>
            { JSON.stringify(user) }
        </div>
    )
}

export default UserList
