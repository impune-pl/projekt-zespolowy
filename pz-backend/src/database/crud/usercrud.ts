import User from "../../objects/user";
import QueryData from "../querydata";
import CRUD from "./crud";

export default class UserCRUD extends CRUD {
	insert(user: User) {
		let qd = new QueryData();
		qd.text =
			'INSERT INTO public."Users" ("phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp") VALUES ($1, $2, $3, $4, $5, $6)';
		qd.values = [user.phoneNumber, user.email, user.passwordHash, user.lastLocation, user.lastLocationTimestamp, user.lastLoginTimestamp];
		return this.connection.execQuery(qd);
	}

	update(user: User) {
		let qd = new QueryData();
		qd.text =
			'UPDATE public."Users" SET "phoneNumber"=$1, email=$2, "passwordHash"=$3, "lastLocation"=$4, "lastLocationTimestamp"=$5, "lastLoginTimestamp"=$6 WHERE id=$7';
		qd.values = [user.phoneNumber, user.email, user.passwordHash, user.lastLocation, user.lastLocationTimestamp, user.lastLoginTimestamp, user.id];
		return this.connection.execQuery(qd);
	}

	find(where: string) {
		let query =
			'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users" WHERE ' +
			where +
			";";
		return this.connection.execRawQuery(query);
	}

	select(id: number) {
		let qd = new QueryData();
		qd.text =
			'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users" WHERE id=$1';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	selectNumber(number: string) {
		let qd = new QueryData();
		qd.text =
			'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users" WHERE "phoneNumber"=$1';
		qd.values = [number];
		return this.connection.execQuery(qd);
	}

	selectEmailLike(email: string) {
		let qd = new QueryData();
		qd.text =
			'SELECT id, "phoneNumber", "email", "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users" WHERE "Users"."email" LIKE \'%\' || $1 || \'%\'';
		qd.values = [email];
		return this.connection.execQuery(qd);
	}

	selectAll() {
		let query = 'SELECT id, "phoneNumber", email, "passwordHash", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp" FROM public."Users";';
		return this.connection.execRawQuery(query);
	}
}
