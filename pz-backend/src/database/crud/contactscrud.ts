import Contact from "../../objects/contect";
import QueryData from "../querydata";
import CRUD from "./crud";

export default class ContactsCRUD extends CRUD {
	insert(contact: Contact) {
		let qd = new QueryData();
		qd.text = 'INSERT INTO public."Contacts"("userId", "contactId", "isLocationShared", "isBlocked", "isAccepted") VALUES ($1, $2, $3, $4, $5)';
		qd.values = [contact.userId, contact.contactId, contact.isLocationShared, contact.isBlocked, contact.isAccepted];
		return this.connection.execQuery(qd);
	}

	update(contact: Contact) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "userId"=$1, "contactId"=$2, "isLocationShared"=$3, "isBlocked"=$4, "isAccepted"=$5 WHERE id=$6';
		qd.values = [contact.userId, contact.contactId, contact.isLocationShared, contact.isBlocked, contact.isAccepted, contact.id];
		return this.connection.execQuery(qd);
	}

	find(where: string) {
		let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE ' + where + ";";
		return this.connection.execRawQuery(query);
	}

	selectId(id: number) {
		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE id=$1';
		qd.values = [id];

		return this.connection.execQuery(qd);
	}

	selectPairByUsersId(user_id: number, contact_id: number) {
		let qd = new QueryData();
		qd.text =
			'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE ("Contacts"."userId"=$1 AND "Contacts"."contactId"=$2) OR ("Contacts"."userId"=$2 AND "Contacts"."contactId"=$1)';
		qd.values = [user_id, contact_id];

		return this.connection.execQuery(qd);
	}

	selectUserId(user_id: number) {
		let qd = new QueryData();
		qd.text = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE public."Contacts"."userId"=$1';
		qd.values = [user_id];

		return this.connection.execQuery(qd);
	}

	selectUserIdDetiled(user_id: number) {
		let qd = new QueryData();
		qd.text =
			'SELECT "Contacts".id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted", "email", "lastLocation", "lastLocationTimestamp", "lastLoginTimestamp", "phoneNumber" FROM "Contacts" JOIN "Users" ON "Contacts"."contactId"="Users".id WHERE public."Contacts"."userId"=$1';
		qd.values = [user_id];

		return this.connection.execQuery(qd);
	}

	selectContactId(user_id: number) {
		let qd = new QueryData();
		qd.text =
			'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE public."Contacts"."contactId"=$1';
		qd.values = [user_id];

		return this.connection.execQuery(qd);
	}

	selectContactUserId(user_id: number, contact_id: number) {
		let qd = new QueryData();
		qd.text =
			'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts" WHERE public."Contacts"."contactId"=$1 AND  public."Contacts"."userId"=$2';
		qd.values = [contact_id, user_id];

		return this.connection.execQuery(qd);
	}

	selectContactUserIDContactNumber(user_id: number, contact_number: number) {
		let qd = new QueryData();
		qd.text = 'SELECT * FROM "Users" JOIN "Contacts" ON "Users".id="Contacts"."contactId" WHERE "Contacts"."userId" = $2 AND "Users"."phoneNumber"= $1 ';
		qd.values = [contact_number, user_id];

		return this.connection.execQuery(qd);
	}

	selectContactUserNumberContactID(user_number: number, contact_id: number) {
		let qd = new QueryData();
		qd.text = 'SELECT * FROM "Users" JOIN "Contacts" ON "Users".id="Contacts"."userId" WHERE "Contacts"."contactId" = $2 AND "Users"."phoneNumber"= $1 ';
		qd.values = [user_number, contact_id];

		return this.connection.execQuery(qd);
	}

	selectAll() {
		let query = 'SELECT id, "userId", "contactId", "isLocationShared", "isBlocked", "isAccepted" FROM public."Contacts"';
		return this.connection.execRawQuery(query);
	}

	accept(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isAccepted"=TRUE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	dismiss(id: number) {
		let qd = new QueryData();
		qd.text = 'DELETE FROM public."Contacts" WHERE "Contacts".id=$1 AND "Contacts"."isAccepted"=FALSE;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	blockUser(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isBlocked"=TRUE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	unlockUser(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isBlocked"=FALSE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	blockLocation(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isLocationShared"=FALSE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}

	unlockLocation(id: number) {
		let qd = new QueryData();
		qd.text = 'UPDATE public."Contacts" SET "isLocationShared"=TRUE WHERE id=$1;';
		qd.values = [id];
		return this.connection.execQuery(qd);
	}
}
