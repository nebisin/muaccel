import { useState } from "react";

const DisplayNameSetting = ({user}) => {
    const [name, setName] = useState(user.name)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

	return (
		<div className="settings-group">
			<label htmlFor="displayName">
				<h3 className="setting-title">Görünen İsim</h3>
				<p className="setting-subtitle">
					Gerçek adınızı veya rahat edeceğiniz bir takma isim girin.
				</p>
			</label>
			<form className="setting-form" onSubmit={(e) => handleSubmit(e)}>
				<input
					className="setting-input"
					type="text"
					id="displayName"
					name="displayName"
                    maxLength="36"
                    value={name}
                    onChange={(e) => setName(e.value)}
				/>
				<button className="setting-button" onClick={(e) => handleSubmit(e)}>Değiştir</button>
			</form>
		</div>
	);
};

export default DisplayNameSetting;
