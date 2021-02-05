import ContactsCRUD from "./contactscrud";
import MessagesCRUD from "./messagescrud";
import MessageTypesCRUD from "./messagetypescrud";
import TokenCRUD from "./tokencrud";
import UserCRUD from "./usercrud";

export default class CRUDS {
	message: MessagesCRUD;
	message_types: MessageTypesCRUD;
	contacts: ContactsCRUD;
	token: TokenCRUD;
	user: UserCRUD;
}
