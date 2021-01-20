import DataBaseConnection from "./databaseconnection";
import Contact from "../objects/contect";
import Message from "../objects/message";
import Token from "../objects/token";
import User from "../objects/user";

export default class DataBaseController extends DataBaseConnection {
	checkLoginData(number: number, password: string) {
		return new Promise((resolve, reject) => {
			this.getUserByNumber(number)
				.then((users) => {
					console.log({ users });
					resolve(true);
				})
				.catch((error) => {
					console.error({ "DATABASE ERROR": error });
					reject(error);
				});
		});
	}
	checkLoginDataWithToken(id: number, token: Token): boolean {
		return true;
	}
	checkIfTokenIsExpired(id: number, token: Token) {
		return new Promise((resolve, reject) => {
			this.crud.token
				.select(id)
				.then((t) => {
					if (t instanceof Token) {
						resolve((t as Token).is_expired);
					} else {
						console.error({ checkIfTokenIsExpired: "selected token is not instanceof Token" });
						resolve(false);
					}
				})
				.catch((err) => {
					console.error(err);
					reject(err);
				});
		});
	}

	newToken(id: number): Token {
		return new Token();
	}
	checkTokens() {
		// https://www.npmjs.com/package/jsonwebtoken
		//
	}
	addUser(user: User) {
		return this.crud.user.insert(user);
	}
	updateUserData(user: User) {
		return this.crud.user.update(user);
	}
	getUser(id: number) {
		return this.crud.user.select(id);
		// return new User();
	}
	getUserByNumber(number: number) {
		return this.crud.user.find('number="' + number + '"');
		// return new User();
	}
	getLocation(user_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.user
				.select(user_id)
				.then((user) => {
					resolve((user as User).location);
				})
				.catch((err) => {
					console.error(err);
					reject(err);
				});
		});
	}
	updateContact(contact: Contact) {
		return this.crud.contacts.update(contact);
	}
	getContact(id: number) {
		return this.crud.contacts.select(id);
	}
	// getContactByUsers(id_1: number, id_2: number): Contact {
	// 	return new Contact();
	// }
	getContacts(id: number) {
		return this.crud.contacts.find('userID="' + id + '"');
		// return [];
	}
	addContact(contect: Contact) {
		return this.crud.contacts.insert(contect);
	}
	getMessages(contact_id: number, from_id: number, how_many: number): Message[] {
		return [];
	}
	getAllMessages(contact_id: number) {
		// TODO:
		return this.crud.message.find("");
	}
	addMessage(message: Message) {
		return this.crud.message.insert(message);
	}
	checkForNewMessages(contact_id: number, last_message_id: number) {
		return new Promise((resolve, reject) => {
			let where = "contact_id=" + contact_id + " and id>" + last_message_id + " ";
			this.crud.message
				.find(where)
				.then((messages) => {
					console.log(messages);
					resolve(true);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
