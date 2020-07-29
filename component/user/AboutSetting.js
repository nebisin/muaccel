import { useState } from "react";

const AboutSetting = ({user}) => {
    const [description, setDescription] = useState(user.description);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

	return (
		<div className="settings-group">
			<label htmlFor="about">
				<h3 className="setting-title">Hakkımda</h3>
				<p className="setting-subtitle">
					Sizi anlatan kısa bir açıklama girin.
				</p>
			</label>
			<form className="setting-form-area" onSubmit={(e) => handleSubmit(e)}>
				<textarea
					className="setting-area"
					type="text"
					id="about"
					name="about"
					rows="4"
                    maxLength="200"
                    value={description}
                    onChange={(e) => setDescription(e.value)}
				/>
				<button className="setting-button" onClick={(e) => handleSubmit(e) }>Değiştir</button>
			</form>
		</div>
	);
};

export default AboutSetting;
