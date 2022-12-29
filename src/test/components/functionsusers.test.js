import functionsModel from '../../components/pages/admin/handleUsers/components/functions';
import userModel from '../../models/users';

describe('changeHandler', () => {
    it('should correctly update the search object', () => {
        const event = {
        target: {
            name: 'username',
            value: 'testuser'
        }
        }
        const setsearch = jest.fn()
        const search = {
        username: '',
        firstName: '',
        lastName: ''
        }
        functionsModel.changeHandler(event, { setsearch, search })
        expect(setsearch).toHaveBeenCalledWith({
        ...search,
        username: 'testuser'
        })
    })
})

describe('searcher', () => {
    it('should correctly search for a user by username', async () => {
        const user = 'testuser'
        const first = ''
        const last = ''
        const setErrorMessage = jest.fn()
        const setUsr = jest.fn()
        const setDeleted = jest.fn()
        const updatedOne = { current: null }
        const advance = true
        const search = {
        username: '',
        firstName: '',
        lastName: ''
        }
        userModel.getSearchUsername = jest.fn().mockResolvedValue({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User'
        })
        await functionsModel.searcher(user, first, last, { setErrorMessage, setUsr, setDeleted, updatedOne, advance, search })
        expect(setErrorMessage).toHaveBeenCalledWith(null)
        expect(setUsr).toHaveBeenCalledWith({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User'
        })
    })

    it('should return an error if no user is found', async () => {
        const user = 'testuser'
        const first = ''
        const last = ''
        const setErrorMessage = jest.fn()
        const setUsr = jest.fn()
        const setDeleted = jest.fn()
        const updatedOne = { current: null }
        const advance = true
        const search = {
        username: '',
        firstName: '',
        lastName: ''
        }
        userModel.getSearchUsername = jest.fn().mockResolvedValue('No user found')
        functionsModel.searcher(user, first, last, { setErrorMessage, setUsr, setDeleted, updatedOne, advance, search })
        expect(setUsr).toHaveBeenCalledWith('')
    })
})

describe('setAll', () => {
    it('should correctly set all users', async () => {
        const setErrorMessage = jest.fn()
        const setUsr = jest.fn()
        userModel.getAllCustomers = jest.fn().mockResolvedValue([
        {
            username: 'testuser1',
            firstName: 'Test',
            lastName: 'User'
        },
        {
            username: 'testuser2',
            firstName: 'Test',
            lastName: 'User'
        }
        ])
        await functionsModel.setAll({ setErrorMessage, setUsr })
        expect(setErrorMessage).toHaveBeenCalledWith(null)
        expect(setUsr).toHaveBeenCalledWith([
        {
            username: 'testuser1',
            firstName: 'Test',
            lastName: 'User'
        },
        {
            username: 'testuser2',
            firstName: 'Test',
            lastName: 'User'
        }
        ])
    })

    it('should return an error if no users are found', async () => {
        const setErrorMessage = jest.fn()
        const setUsr = jest.fn()
        userModel.getAllCustomers = jest.fn().mockResolvedValue('No user found')
        await functionsModel.setAll({ setErrorMessage, setUsr })
        expect(setErrorMessage).toHaveBeenCalledWith('Ingen användare hittad')
    })
})

describe('SelectOne', () => {
    it('should correctly set the selected user and update the selectedUserFix and updatedOne refs', () => {
        const value = {
        history: {
            username: 'testuser',
            firstName: 'Test',
            lastName: 'User'
        }
        }
        const updatedOne = { current: '' }
        const selectedUserFix = { current: '' }
        const setSelectedUser = jest.fn()
        functionsModel.SelectOne(value, { updatedOne, selectedUserFix, setSelectedUser })
        expect(selectedUserFix.current).toEqual('choosen')
        expect(updatedOne.current).toEqual('')
        expect(setSelectedUser).toHaveBeenCalledWith({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User'
        })
    })
})

describe('saveUpdate', () => {
    it('should correctly update a user and set the selectedUser and updatedOne refs', async () => {
        const id = '12345'
        const user = 'testuser'
        const first = 'Test'
        const last = 'User'
        const selectedUserFix = { current: '' }
        const updatedOne = { current: '' }
        const setSelectedUser = jest.fn()
        const setUsr = jest.fn()
        userModel.updateUser = jest.fn().mockResolvedValue()
        userModel.getUser = jest.fn().mockResolvedValue({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User'
        })
        await functionsModel.saveUpdate(id, user, first, last, { selectedUserFix, updatedOne, setSelectedUser, setUsr })
        expect(selectedUserFix.current).toEqual(null)
        expect(updatedOne.current).toEqual(null)
        expect(setSelectedUser).toHaveBeenCalledWith(null)
    })
})

describe('deleteUpdate', () => {
    it('should correctly delete a user and update the deleted and usr state variables', () => {
        const picked = {
        _id: '12345'
        }
        const deleted = false
        const setDeleted = jest.fn()
        const setUsr = jest.fn()
        const selectedUserFix = { current: null }
        const updatedOne = { current: null }
        userModel.deleteUser = jest.fn()
        functionsModel.deleteUpdate(picked, { deleted, setDeleted, setUsr, selectedUserFix, updatedOne })
        expect(setDeleted).toHaveBeenCalledWith(true)
        expect(selectedUserFix.current).toEqual(null)
        expect(updatedOne.current).toEqual(null)
    })

    it('should correctly reset the deleted state variable', () => {
        const picked = {
        _id: '12345'
        }
        const deleted = true
        const setDeleted = jest.fn()
        const setUsr = jest.fn()
        const selectedUserFix = { current: '' }
        const updatedOne = { current: '' }
        userModel.deleteUser = jest.fn()
        functionsModel.deleteUpdate(picked, { deleted, setDeleted, setUsr, selectedUserFix, updatedOne })
        expect(setDeleted).toHaveBeenCalledWith(false)
    })
    })
