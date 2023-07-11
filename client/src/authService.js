
const saveUser = (user) => {
    sessionStorage["user"] = JSON.stringify(user);
}

const getUser = () => {
    return sessionStorage["user"] && JSON.parse(sessionStorage["user"]);
}

const authService = { saveUser, getUser }
export default authService;