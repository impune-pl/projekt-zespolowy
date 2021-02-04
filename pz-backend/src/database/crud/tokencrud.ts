import Token from "../../objects/token";
import QueryData from "../querydata";
import CRUD from "./crud";

export default class TokenCRUD extends CRUD {
	insert(token: Token) {
		let qd = new QueryData();
		qd.text = 'INSERT INTO public."Tokens" ("userId", "token", "generatedTimestamp", "expirationTimestamp", "isExpired") VALUES ($1, $2, $3, $4, $5)';
		qd.values = [token.userId, token.token, token.generatedTimestamp, token.expirationTimestamp, token.isExpired];
		return this.connection.execQuery(qd);
	}

	update(token: Token) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Tokens" SET "userId"=$1, "token"=$2, "generatedTimestamp"=$3, "expirationTimestamp"=$4, "isExpired"=$5 WHERE id=$6';
		qd.values = [token.userId, token.token, token.generatedTimestamp, token.expirationTimestamp, token.isExpired, token.id];
		return this.connection.execQuery(qd);
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
		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE "Tokens".id=$1';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	selectUserId(id: number) {
		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE "Tokens"."userId"=$1';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	selectToken(token: string) {
		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens" WHERE "Tokens"."token"=$1';
		qd.values = [token];
		return this.connection.execQuery(qd);
	}

	selectAll() {
		let query = 'SELECT id, "userId", token, "generatedTimestamp", "expirationTimestamp", "isExpired" FROM public."Tokens";';
		return this.connection.execRawQuery(query);
	}
}
