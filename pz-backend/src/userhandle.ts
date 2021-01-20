import DataBaseController from "./database/databasecontroller";
import Contact from "./objects/contect";
import Message from "./objects/message";
import Token from "./objects/token";
import User from "./objects/user";

export default class UserHandle {
	db: DataBaseController;

	constructor(db: DataBaseController) {
		this.db = db;
	}

	login(number: number, password: string) {
		return this.db.checkLoginData(number, this.generateHash(password));
	}

	loginWithToken(id: number, token: Token): boolean {
		return this.db.checkLoginDataWithToken(id, token);
	}

	register(number: number, email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.db.getUserByNumber(number).then((user) => {
				if (user) {
					reject("User exists");
				} else {
					let user = new User();
					user.number = number;
					user.email = email;
					user.password_hash = this.generateHash(password);
					this.db.addUser(user);
					resolve(user);
				}
			});
		});
	}

	addContact(id: number, number: number) {
		return new Promise((resolve, reject) => {
			let contact = new Contact();
			contact.user = new User();
			contact.user.id = id;
			this.db
				.getUserByNumber(number)
				.then((user) => {
					contact.contact = new User();
					contact.contact.id = (user as User).id;
					this.db
						.addContact(contact)
						.then(() => {
							resolve(true);
						})
						.catch((err) => {
							console.error({ add_contact: err });
							reject(err);
						});
				})
				.catch((err) => {
					console.error({ add_contact: err });
					reject(err);
				});
		});
	}

	// getInvitationsList(id: number): Contact[] {
	// 	return [];
	// }

	acceptInvitation(contact_id: number): boolean {
		this.db
			.getContact(contact_id)
			.then((contact) => {
				(contact as Contact).accepted = true;
				this.db.updateContact(contact as Contact);
			})
			.catch((err) => {
				console.error({ acceptInvitation: err });
			});
		return true;
	}

	getFriendsList(id: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.find("userId=" + id + " ")
				.then((contacts) => {
					console.log({ contacts });
					resolve(contacts);
				})
				.catch((err) => {
					console.error({ getFriendsList: err });
					reject(err);
				});
		});
	}

	updateLocation(id: number, location: string) {
		this.db
			.getUser(id)
			.then((user) => {
				(user as User).location = location;
			})
			.catch((err) => {
				console.error({ location_update: err });
			});
	}

	getLocation(id: number, target_id: number) {
		return new Promise((resolve, reject) => {
			this.canGetLocation(id, target_id)
				.then((can) => {
					console.log({ can });
					if (can) {
						this.db
							.getLocation(target_id)
							.then((location) => {
								console.log({ location });
								resolve(location);
							})
							.catch((err) => {
								console.error({ get_location_error: err });
								reject(err);
							});
					} else {
						resolve(null);
					}
				})
				.catch((err) => {
					console.error({ get_location_error: err });
					reject(err);
				});
		});
	}

	canGetLocation(id: number, target_id: number) {
		let where = "userId=" + target_id + " and contactId=" + id + " ";
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.find(where)
				.then((contact) => {
					resolve((contact as Contact).share_location);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	disableLocation(user_id: number, target_id: number) {
		let where = "userId=" + user_id + " and contactId=" + target_id + " ";
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.find(where)
				.then((contact) => {
					console.log({ contact });
					if (contact instanceof Contact) {
						contact.share_location = false;
						this.db.updateContact(contact);
						resolve(true);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	enableLocation(user_id: number, target_id: number) {
		let where = "userId=" + user_id + " and contactId=" + target_id + " ";
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.find(where)
				.then((contact) => {
					console.log({ contact });
					if (contact instanceof Contact) {
						contact.share_location = true;
						this.db.updateContact(contact);
						resolve(true);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	isUserBlocekd(user_id: number, target_id: number) {
		let where = "userId=" + user_id + " and contactId=" + target_id + " ";
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.find(where)
				.then((contact) => {
					console.log({ contact });
					resolve((contact as Contact).blocked);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	sendMessage(contact_id: number, message: string, type: string) {
		let mess = new Message();
		mess.contact_id = contact_id;
		mess.content = message;
		mess.type = type;
		let date_now = new Date();
		mess.date = String(date_now.getDate()).padStart(2, "0") + "-" + String(date_now.getMonth() + 1).padStart(2, "0") + "-" + date_now.getFullYear();
		this.db.addMessage(mess);
	}

	checkForNewMessages(contact_id: number, last_message_id: number) {
		return this.db.checkForNewMessages(contact_id, last_message_id);
	}

	getMessages(contact_id: number, from_id: number, how_many: number): Message[] {
		return this.db.getMessages(contact_id, from_id, how_many);
	}

	getAllMessages(contact_id: number) {
		return this.db.getAllMessages(contact_id);
	}

	blockUser(user_id: number, target_id: number) {
		let where = "userId=" + user_id + " and contactId=" + target_id + " ";
		return new Promise((resolve, reject) => {
			this.db.crud.contacts
				.find(where)
				.then((contact) => {
					console.log({ contact });
					if (contact instanceof Contact) {
						contact.blocked = true;
						this.db.updateContact(contact);
						resolve(true);
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	findContact(number: number) {
		return new Promise((resolve, reject) => {
			this.db.crud.user
				.find("phoneNumber=" + number + " ")
				.then((user) => {
					console.log({ user });
					resolve(true);
				})
				.catch((err) => {
					console.error({ find_contact: err });
					reject(err);
				});
		});
	}

	createToken(id: number): Token {
		return new Token();
	}

	generateHash(variable: string): string {
		return variable;
	}
}
