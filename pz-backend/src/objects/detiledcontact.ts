import User from "./user";

// Data class
export default class DetiledContact {
	public id: number;
	public userId: number;
	public contact: User;
	public isBlocked: boolean;
	public isLocationShared: boolean;
	public isAccepted: boolean;
}
