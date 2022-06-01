import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import upload_photo from "../../../../../assets/upload_photo.svg";
import Logo from "./Inputs/Logo";

import * as serversActions from "../../../../../store/servers";

const Overview = ({ server, onClose }) => {
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState([]);

	// const uploadBgRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const serverToUpdate = { id: server.id, name, description };
		const res = await dispatch(serversActions.editServer(serverToUpdate));
		if (res.server) {
			onClose();
		} else {
			setErrors(res);
		}
	};

	const cancelEdit = () => {
		setName(server.name);
		setDescription(server.description);
		setErrors([]);
	};

	useEffect(() => {
		setName(server?.name);
		setDescription(server?.description);
	}, [server]);

	return (
		<form className="setting-server-overview-wrap" onSubmit={handleSubmit}>
			<div className="setting-server-overview-title">Server Overview</div>
			<div className="setting-server-overview-top-wrap">
				<div className="setting-server-overview-bg-logo">
					{server?.background ? (
						<div
							className="setting-server-overview-background"
							style={{ backgroundImage: `url(${server.background})` }}
						>
							<div>CHANGE IMAGE</div>
							<div className="setting-server-logo-upload">
								<img src={upload_photo} alt="Upload" />
							</div>
						</div>
					) : (
						<div className="setting-server-overview-no-background">
							<div>UPLOAD BACKGROUND</div>
							<div className="setting-server-logo-upload">
								<img src={upload_photo} alt="Upload" />
							</div>
						</div>
					)}

					<div className="setting-server-overview-logo-name">
						<Logo server={server} errors={errors} setErrors={setErrors} />
						<div className="setting-server-logo-desc">
							We recommend an image of at least 512x512 for the server.
						</div>
						<div className="setting-server-form">
							<label className="input-label">
								SERVER NAME
								<input
									className="input"
									type="text"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								></input>
							</label>
						</div>
					</div>
				</div>
			</div>
			<label className="input-label">
				DESCRIPTION
				<textarea
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="textarea"
				/>
			</label>
			<div className="error-list">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="setting-button-wrap">
				<button
					className="form-create-btm-clear-btn"
					type="button"
					onClick={cancelEdit}
				>
					Cancel
				</button>
				<button className="form-create-btm-btn" type="submit">
					Update
				</button>
			</div>
		</form>
	);
};

export default Overview;
