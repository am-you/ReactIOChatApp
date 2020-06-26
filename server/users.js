const users = [];

const addUser = ({ id, name, room }) => {

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);
    const user = { id, name, room };

    // TODO Changer alert en une methode de validation plus userfriendly sans redirection
    if(!name || !room) return { error: 'Username and room are required.' };
    if(existingUser == null) {
        users.push(user);
        return { user };
    }else {
        return { error: `Pseudo ${name} déjà pris pour cette room. Veuillez en choisir un autre.` };
    }
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsers = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsers };
