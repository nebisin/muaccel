import { useState } from 'react';
import mevzuatApi from 'api/mevzuat';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const ContactPage = () => {
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [emailError, setEmailError] = useState();
	const [subjectError, setSubjectError] = useState();
    const [sending, setSending] = useState(false);

	const _handleSubmit = async (e) => {
		e.preventDefault();
		let error = false;
		setSubjectError();
        setEmailError();
		setSending(true);
		if (!subject) {
			error = true;
			setSubjectError('Bir konu girmelisiniz!');
		}

		const isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (email && !isEmail.test(email)) {
			error = true;
			setEmailError('Geçersiz bir e-posta adresi girdiniz!');
		}
		if (!error) {
            try {
                const response = await mevzuatApi.post('/contact', {
                    email,
                    subject,
                    message
                });
                alert('Mesajınız başarıyla gönderildi!')
            } catch (error) {
                alert('Bir hata ile karşılaştık. Lütfen daha sonra tekrar deneyiniz.')
            }

		}
		setSending(false);
	};

	return (
		<React.Fragment>
			<div className="flex-container">
				<div className="register-flex">
					<div className="register-header">
						<div className="register-title">İletişim Formu</div>
						<div className="register-subtitle">Mesajlarınızı bize iletin</div>
					</div>
					<ol className="contact-description">
						<li>
							1) Bu form aracılığıyla önerilerinizi, eleştirilerinizi ve
							şikâyetlerinizi bize iletebilirsiniz.
						</li>
						<li>
							2) Eğer mesajınızla alakalı daha sonra sizinle iletişim
							kurulmasını istemiyorsanız e-posta adresini boş bırakabilirsiniz.
						</li>
						<li>
							3) Mesajınız sitemizdeki bir içerikle ilgiliyse içeriğin bulunduğu
							adresi eklemeniz daha hızlı çözüm bulmamızda bize yardımcı
							olacaktır.
						</li>
					</ol>
					<form className="register-form" onSubmit={(e) => _handleSubmit(e)}>
						<div className="form-control">
							<label htmlFor="email">E-posta Adresiniz</label>
							<input
								type="text"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							{emailError && <div className="error">{emailError}</div>}
						</div>
						<div className="form-control">
							<label htmlFor="subject">Konu</label>
							<input
								type="text"
								id="subject"
								name="subject"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
							/>
							{subjectError && <div className="error">{subjectError}</div>}
						</div>
						<div className="form-control">
							<label htmlFor="message">Mesajınız</label>
							<textarea
								id="message"
								name="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
						</div>

                        <button
							type="submit"
							className="login-button login-button-inner"
							onClick={(e) => _handleSubmit(e)}
						>
							{sending ? (
								<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
							) : (
								'Gönder'
							)}
						</button>
					</form>
				</div>
			</div>
			<div className="bottom-clear"></div>
		</React.Fragment>
	);
};

export default ContactPage;
