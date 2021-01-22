import { Client } from "pg";
import DataBaseConnection from "../databaseconnection";

export default class CRUD {
	connection: DataBaseConnection;

	constructor(connection: DataBaseConnection) {
		this.connection = connection;
	}
}
