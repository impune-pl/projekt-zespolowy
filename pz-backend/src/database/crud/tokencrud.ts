import Token from "../../objects/token";
import CRUD from "./crud";

export default class TokenCRUD extends CRUD {
	insert(token: Token) {
		/**
		 * INSERT INTO public."Tokens"(id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired") VALUES (?, ?, ?, ?, ?, ?);
		 */
		let query =
			'INSERT INTO public."Tokens" ("userId", "token", "generatedTimestamp", "expirationTimestamp", "isExpired") VALUES (' +
			token.user_id +
			"," +
			token.token +
			"," +
			token.generated_date +
			"," +
			token.expire_date +
			"," +
			token.is_expired +
			");";
		return this.connection.execRawQuery(query);
	}

	update(token: Token) {
		/**
		 * UPDATE public."Tokens" SET id=?, "userId"=?, token=?, "generatedTimestamp"=?, "expirationTimestamp"=?, "isExpired"=? WHERE <condition>;
		 */
		let query =
			'UPDATE public."Tokens" SET ' +
			'userId="' +
			token.user_id +
			'",' +
			'token="' +
			token.token +
			'",' +
			'generatedTimestamp="' +
			token.generated_date +
			'",' +
			'expirationTimestamp="' +
			token.expire_date +
			'",' +
			'isExpired="' +
			token.is_expired +
			'" ' +
			'WHERE id="' +
			token.id +
			";";
		return this.connection.execRawQuery(query);
	}

	find(where: string) {
		let query = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	select(id: number) {
		/**
		 * SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens";
		 */
		return this.find('id="' + id + '"');
		// let query = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE id="' + id + '";';
		// return this.connection.execRawQuery(query);
	}

	selectAll() {
		/**
		 * SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens";
		 */
		let query = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens";';
		return this.connection.execRawQuery(query);
	}
}
