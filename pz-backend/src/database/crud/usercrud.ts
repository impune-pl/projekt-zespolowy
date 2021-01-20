import User from "../../objects/user";
import CRUD from "./crud";

export default class UserCRUD extends CRUD {
	insert(user: User) {
		/**
		 * INSERT INTO public."Users" (id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp") VALUES (?, ?, ?, ?, ?, ?, ?);
		 */
		let query =
			'INSERT INTO public."Users" ("phoneNumber", "email", "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp") VALUES (' +
			user.number +
			"," +
			user.email +
			"," +
			user.password_hash +
			"," +
			user.location +
			"," +
			user.last_location_update +
			"," +
			user.last_login +
			");";
		return this.connection.execRawQuery(query);
	}

	update(user: User) {
		/**
		 * UPDATE public."Users" SET id=?, "phoneNumber"=?, email=?, "passwordHash"=?, "lastLocation"=?, "lastLocationTimestamp"=?, "lastLoginTimestamp"=? WHERE <condition>;
		 */
		let query =
			'UPDATE public."Users" SET ' +
			'"phoneNumber"="' +
			user.number +
			'", ' +
			'"email"="' +
			user.email +
			'", ' +
			'passwordHash="' +
			user.password_hash +
			'", ' +
			'lastLocation="' +
			user.location +
			'", ' +
			'lastLocationTimestamp="' +
			user.last_location_update +
			'", ' +
			'lastLoginTimestamp="' +
			user.last_login +
			'" ' +
			'WHERE id="' +
			user.id +
			'";';
		return this.connection.execRawQuery(query);
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
		return this.find('id="' + id + '"');
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
