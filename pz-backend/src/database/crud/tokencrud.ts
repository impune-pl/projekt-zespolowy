import Token from "../../objects/token";
import QueryData from "../querydata";
import CRUD from "./crud";

export default class TokenCRUD extends CRUD {
	insert(token: Token) {
		/**
		 * INSERT INTO public."Tokens"(id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired") VALUES (?, ?, ?, ?, ?, ?);
		 */
		let qd = new QueryData();
		qd.text = 'INSERT INTO public."Tokens" ("userId", "token", "generatedTimestamp", "expirationTimestamp", "isExpired") VALUES ($1, $2, $3, $4, $5)';
		qd.values = [token.userId, token.token, token.generatedTimestamp, token.expirationTimestamp, token.isExpired];
		return this.connection.execQuery(qd);
		// let query =
		// 	'INSERT INTO public."Tokens" ("userId", "token", "generatedTimestamp", "expirationTimestamp", "isExpired") VALUES (' +
		// 	token.user_id +
		// 	"," +
		// 	token.token +
		// 	"," +
		// 	token.generated_date +
		// 	"," +
		// 	token.expire_date +
		// 	"," +
		// 	token.is_expired +
		// 	");";
		// return this.connection.execRawQuery(query);
	}

	update(token: Token) {
		/**
		 * UPDATE public."Tokens" SET id=?, "userId"=?, token=?, "generatedTimestamp"=?, "expirationTimestamp"=?, "isExpired"=? WHERE <condition>;
		 */
		let qd = new QueryData();
		qd.text = 'UPDATE public."Tokens" SET "userId"=$1, "token"=$2, "generatedTimestamp"=$3, "expirationTimestamp"=$4, "isExpired"=$5 WHERE id=$6';
		qd.values = [token.userId, token.token, token.generatedTimestamp, token.expirationTimestamp, token.isExpired, token.id];
		return this.connection.execQuery(qd);
		// let query =
		// 	'UPDATE public."Tokens" SET ' +
		// 	'userId="' +
		// 	token.user_id +
		// 	'",' +
		// 	'token="' +
		// 	token.token +
		// 	'",' +
		// 	'generatedTimestamp="' +
		// 	token.generated_date +
		// 	'",' +
		// 	'expirationTimestamp="' +
		// 	token.expire_date +
		// 	'",' +
		// 	'isExpired="' +
		// 	token.is_expired +
		// 	'" ' +
		// 	'WHERE id="' +
		// 	token.id +
		// 	";";
		// return this.connection.execRawQuery(query);
	}

	find(where: string) {
		let query = 'SELECT id, "userId", "token", "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	check() {
		let query = 'SELECT public."RemoveExpiredTokensByTimestamps"()';
		return this.connection.execRawQuery(query);
	}

	select(id: number) {
		/**
		 * SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens";
		 */
		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE "Tokens".id=$1';
		qd.values = [id];
		return this.connection.execQuery(qd);
		// return this.find('id="' + id + '"');
		// let query = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE id="' + id + '";';
		// return this.connection.execRawQuery(query);
	}

	selectUserId(id: number) {
		/**
		 * SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens";
		 */
		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE "Tokens"."userId"=$1';
		qd.values = [id];
		return this.connection.execQuery(qd);
		// return this.find('id="' + id + '"');
		// let query = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE id="' + id + '";';
		// return this.connection.execRawQuery(query);
	}

	selectToken(token: string) {
		/**
		 * SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens";
		 */
		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE "Tokens"."token"=$1';
		qd.values = [token];
		return this.connection.execQuery(qd);
		// return this.find('id="' + id + '"');
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
