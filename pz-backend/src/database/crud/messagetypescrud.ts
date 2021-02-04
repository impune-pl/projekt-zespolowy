import MessageTypes from "../../objects/messagetypes";
import QueryData from "../querydata";
import CRUD from "./crud";

export default class MessageTypesCRUD extends CRUD {
	insert(mt: MessageTypes) {
		let qd = new QueryData();
		qd.text = 'INSERT INTO public."MessageTypes"(type) VALUES ($1)';
		qd.values = [mt.type];
		return this.connection.execQuery(qd);
	}

	update(mt: MessageTypes) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."MessageTypes" SET type=$1 WHERE id=$2';
		qd.values = [mt.type, mt.id];
		return this.connection.execQuery(qd);
	}

	find(where: string) {
		let query = 'SELECT id, type FROM public."MessageTypes" WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	select(id: number) {
		let qd = new QueryData();
		qd.text = 'SELECT id, type FROM public."MessageTypes" WHERE id=$1';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	selectType(type: string) {
		let qd = new QueryData();
		qd.text = 'SELECT id, type FROM public."MessageTypes" WHERE type=$1';
		qd.values = [type];
		return this.connection.execQuery(qd);
	}

	selectAll() {
		let query = 'SELECT id, type FROM public."MessageTypes";';
		return this.connection.execRawQuery(query);
	}
}
