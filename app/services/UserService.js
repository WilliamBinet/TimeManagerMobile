import axios from 'axios'

export default {

    getUserById(id) {
        return axios.get(process.env.VUE_APP_URL + '/users/' + id).catch(e => {
            alert(e.message.statusText);
        });
    },

    getAllUser() {
        return axios.get(process.env.VUE_APP_URL + '/users').catch(e => {
            alert(e.response.statusText);
        })
    },

    getUserByEmail(email) {
        if (email === ""){
            return this.getAllUser();
        }
        return axios.get(process.env.VUE_APP_URL +'/users?email=' + email).catch(e => {
            console.log('err ' + JSON.stringify(e));
            alert(e.response.statusText);
        })
    },

getUsersByRole(role)
{
    return axios.get(process.env.VUE_APP_URL + '/users?role=' + role).catch(e => alert(e.response.statusText));
}
,

updateUser(user)
{
    let updates = {
        updates: user
    };
    return axios.put(process.env.VUE_APP_URL + '/users/' + user.id, updates).catch(e => {
        throw e;
    })
}
,

deleteUser(idUser)
{
    return axios.delete(process.env.VUE_APP_URL + '/users/' + idUser).catch(e => {
        alert(e.response.statusText);
    })
}
}
