// Data class
export default class User {
	public id: number;
	public phoneNumber: number;
	public email: string;
	public lastLocation: string;
	public lastLocationTimestamp: Date;
	public lastLoginTimestamp: Date;
	public passwordHash: string;
}
