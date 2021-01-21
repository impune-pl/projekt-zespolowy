import DataBaseConnection from "./databaseconnection";
import Contact from "../objects/contect";
import Message from "../objects/message";
import Token from "../objects/token";
import User from "../objects/user";
import * as pg from "pg";
import { use } from "passport";

export default class DataBaseController extends DataBaseConnection {
	checkLoginData(number: number, password: string) {
		return new Promise((resolve, reject) => {
			this.getUserByNumber(number)
				.then((users: pg.QueryResult) => {
					console.log({ users, rows: users.rows });
					if (users.rowCount === 1) {
						let u = users.rows[0] as User;
						u.lastLoginTimestamp = new Date();
						this.crud.user.update(u);
						resolve(u);
					} else {
						reject("User does not exists");
					}
				})
				.catch((error) => {
					console.error({ "DATABASE ERROR": error });
					reject(error);
				});
		});
	}

	checkLoginDataWithToken(token: string) {
		return new Promise((resolve, reject) => {
			this.crud.token
				.selectToken(token)
				.then((token: pg.QueryResult) => {
					if (token.rowCount > 0) {
						let t = token.rows[0] as Token;
						this.crud.token.check();
						if (t.isExpired) {
							resolve(false);
						} else {
							resolve(this.crud.user.select(t.userId));
						}
					}
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
	// checkIfTokenIsExpired(token: string) {
	// 	return new Promise((resolve, reject) => {
	// 		this.crud.token
	// 			.selectToken(token)
	// 			.then((t) => {
	// 				if (t instanceof Token) {
	// 					resolve((t as Token).isExpired);
	// 				} else {
	// 					console.error({ checkIfTokenIsExpired: "selected token is not instanceof Token" });
	// 					resolve(false);
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				console.error(err);
	// 				reject(err);
	// 			});
	// 	});
	// }

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
		return this.crud.user.selectNumber(number.toString());
		return this.crud.user.find('public."Users"."phoneNumber"=' + "'" + number + "'");
		// return new User();
	}
	getLocation(user_id: number) {
		return new Promise((resolve, reject) => {
			this.crud.user
				.select(user_id)
				.then((user: pg.QueryResult) => {
					if (user.rowCount > 0) resolve((user.rows[0] as User).lastLocation);
					else resolve(null);
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
		return this.crud.contacts.selectId(id);
	}
	// getContactByUsers(id_1: number, id_2: number): Contact {
	// 	return new Contact();
	// }
	getContacts(id: number) {
		return this.crud.contacts.find('public."Contacts".userID=' + id);
		// return [];
	}
	addContact(contact: Contact) {
		return this.crud.contacts.insert(contact);
	}
	getMessages(contact_id: number, from_id: number, how_many: number): Message[] {
		return [];
	}
	getAllMessages(contact_id: number) {
		return this.crud.message.selectAllForContact(contact_id);
	}
	addMessage(message: Message) {
		return this.crud.message.insert(message);
	}
	checkForNewMessages(contact_id: number, last_message_id: number) {
		return new Promise((resolve, reject) => {
			// let where = "contact_id=" + contact_id + " and id>" + last_message_id + " ";
			this.crud.message
				.checkForNew(contact_id, last_message_id)
				// .find(where)
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
