export const types = {
    auth:{
        setCredentials: '[auth] setCredentials',
        logIn: '[auth] signIn',
        signUp: '[auth] signUp',
        signOut: '[auth] signOut',
        addErrorLogin: '[auth] addErrorLogin',
        removeErrorLogin: '[auth] removeErrorLogin',
        addErrorRegister: '[auth] addErrorRegister',
        removeErrorRegister: '[auth] removeErrorRegister',
        notAuthenticated: '[auth] notAuthenticated',
        checking: '[auth] checking'
    },
    user:{
        addUser: '[user] addUser',
        changeGroup: '[user] changeGroup',
        createGroup: '[user] createGroup',
        joinGroup: '[user] joinGroup',
        addErrorMessage: '[user] addErrorMessage',
        removeErrorMessage: '[user] removeErrorMessage',
        addRecipes: '[user] addRecipes'
    }
}