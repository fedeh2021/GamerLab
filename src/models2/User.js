const fs = require('fs');
const db = "./src/database/models"

const User = {
	fileName: './src/data/usersData.json', 						// lo eliminaria
getData: function () {
	return JSON.parse(fs.readFileSync(this.fileName, 'utf-8')); // lo eliminaria
},
generateId: function () {										// quedaria igual
	let allUsers = this.findAll();
	let lastUser = allUsers.pop();
	if (lastUser) {
		return lastUser.id + 1;
	}
	return 1;
},

findAll: function () {											//return db.Cliente.findAll()
	return this.getData()
},
findByPk: function (id) {
	let allUsers = this.findAll();
	let userFound = allUsers.find(oneUser => oneUser.id === id);
	return userFound;	
},
findByField: function (field, text) {
	let allUsers = this.findAll();
	let userFound = allUsers.find(oneUser => oneUser[field] === text);
	return userFound;
},

create: function (userData) {										// no me cierra
	let allUsers = this.findAll();
	let newUser = {
		id: this.generateId(),
		...userData
	}
	allUsers.push(newUser);
	fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
	return newUser;
},

delete: function (id) {
	let allUsers = this.findAll();
	let finalUsers =  allUsers.filter(oneUser => oneUser.id !== id);
	fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
	return true;
}
}

module.exports = User; 