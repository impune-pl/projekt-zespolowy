import User from "../../objects/user";
import QueryData from "../querydata";
import CRUD from "./crud";

export default class UserCRUD extends CRUD {
	insert(user: User) {
		/**
		 * INSERT INTO public."Users" (id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp") VALUES (?, ?, ?, ?, ?, ?, ?);
		 */
		let qd = new QueryData();
		qd.text =
			'INSERT INTO public."Users" ("phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp") VALUES ($1, $2, $3, $4, $5, $6)';
		qd.values = [user.phoneNumber, user.email, user.passwordHash, user.lastLocation, user.lastLocationTimestamp, user.lastLoginTimestamp];
		return this.connection.execQuery(qd);
		// let query =
		// 	'INSERT INTO public."Users" ("phoneNumber", "email", "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp") VALUES (' +
		// 	user.number +
		// 	"," +
		// 	user.email +
		// 	"," +
		// 	user.password_hash +
		// 	"," +
		// 	user.location +
		// 	"," +
		// 	user.last_location_update +
		// 	"," +
		// 	user.last_login +
		// 	");";
		// return this.connection.execRawQuery(query);
	}

	update(user: User) {
		/**
		 * UPDATE public."Users" SET id=?, "phoneNumber"=?, email=?, "passwordHash"=?, "lastLocation"=?, "lastLocationTimestamp"=?, "lastLoginTimestamp"=? WHERE <condition>;
		 */
		let qd = new QueryData();
		qd.text =
			'UPDATE public."Users" SET "phoneNumber"=$1, email=$2, "passwordHash"=$3, "lastLocation"=$4, "lastLocationTimestamp"=$5, "lastLoginTimestamp"=$6 WHERE id=$7';
		qd.values = [user.phoneNumber, user.email, user.passwordHash, user.lastLocation, user.lastLocationTimestamp, user.lastLoginTimestamp, user.id];
		return this.connection.execQuery(qd);
		// let query =
		// 	'UPDATE public."Users" SET ' +
		// 	'"phoneNumber"="' +
		// 	user.number +
		// 	'", ' +
		// 	'"email"="' +
		// 	user.email +
		// 	'", ' +
		// 	'passwordHash="' +
		// 	user.password_hash +
		// 	'", ' +
		// 	'lastLocation="' +
		// 	user.location +
		// 	'", ' +
		// 	'lastLocationTimestamp="' +
		// 	user.last_location_update +
		// 	'", ' +
		// 	'lastLoginTimestamp="' +
		// 	user.last_login +
		// 	'" ' +
		// 	'WHERE id="' +
		// 	user.id +
		// 	'";';
		// return this.connection.execRawQuery(query);
	}

	find(where: string) {
		let query =
			'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users" WHERE ' +
			where +
			";";
		return this.connection.execRawQuery(query);
	}

	select(id: number) {
		/**
		 * SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users";
		 */
		let qd = new QueryData();
		qd.text =
			'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users" WHERE id=$1';
		qd.values = [id];
		return this.connection.execQuery(qd);
		// return this.find('id="' + id + '"');
		// let query = 'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users";';
		// return this.connection.execRawQuery(query);
	}

	selectNumber(number: string) {
		/**
		 * SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users";
		 */
		let qd = new QueryData();
		qd.text =
			'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users" WHERE "phoneNumber"=$1';
		qd.values = [number];
		return this.connection.execQuery(qd);
		// return this.find('id="' + id + '"');
		// let query = 'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users";';
		// return this.connection.execRawQuery(query);
	}

	selectAll() {
		/**
		 * SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users";
		 */
		let query = 'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users";';
		return this.connection.execRawQuery(query);
	}
}
