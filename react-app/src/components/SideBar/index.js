import { useEffect } from "react";
import { useDispatch } from "react-redux";

import LogoutButton from "../auth/LogoutButton";

import * as serversActions from "../../store/servers";
import * as channelsActions from "../../store/channels";
import * as chatsActions from "../../store/chats";
import * as prvChannelsActions from "../../store/prvChannels";
import * as prvChatsActions from "../../store/prvChats";
import * as otherServersActions from "../../store/otherServers";
import * as usersActions from "../../store/users";

const SideBar = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		fetch("/api/users/all")
			.then((res) => res.json())
			.then((data) => {
				dispatch(serversActions.getServers(data.servers));
				dispatch(channelsActions.getChannels(data.channels));
				dispatch(chatsActions.getChats(data.chats));
				dispatch(prvChannelsActions.getPrvChannels(data.prvChannels));
				dispatch(prvChatsActions.getPrvChats(data.prvChats));
				dispatch(otherServersActions.getOtherServers(data.otherServers));
				dispatch(usersActions.getUsers(data.users));
			});
	}, []);
	return (
		<div className="sidebar-ctrl">
			sidebar
			<LogoutButton />
		</div>
	);
};
export default SideBar;
