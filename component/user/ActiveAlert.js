import { useContext, useState } from 'react';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';

const ActiveAlert = () => {
	const { userInfo, token } = useContext(AuthContext);
	const [sending, setSending] = useState(false);
	const [send, setSend] = useState(false);
	const [isError, setIsError] = useState(false);

	const sendWelcomeEmail = async (token) => {
		setSending(true);
		if (!token) {
			setIsError(true);
			setSending(false);
		}

		try {
			const response = await mevzuatApi.post(
				'/user/sendwelcome',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setIsError(false);
		} catch (error) {
			setIsError(true);
		}
		setSending(false);
		setSend(true);
	};

	if (userInfo.isActive === false) {
		return (
			<div className="isActiveAlert">
				<h2 className="isActiveAlert-title">Son bir adım kaldı</h2>
				<p>
					Üyeliğinizi tamamlayabilmek için e-posta adresinize gönderdiğimiz
					linke tıklayarak hesabınızı doğrulamanız gerekmektedir. Gönderdiğimiz
					mail posta kutunuzda görünmüyorsa lütfen gereksiz (spam) bölümünü de
					kontrol edin.
				</p>
				<p>
					Doğrulama mailini almadınız mı?{' '}
					{sending ? (
						<div>Gönderiliyor...</div>
					) : (
						<React.Fragment>
							{send ? (
								<React.Fragment>
									{isError ? (
										<div>
											Beklenmeyen bir hata oluştu. Lüfen daha sonra tekrar
											deneyiniz.
										</div>
									) : (
										<div>Doğrulama e-postası gönderildi.</div>
									)}
								</React.Fragment>
							) : (
								<button
									className="isActiveAlert-button"
									onClick={() => sendWelcomeEmail(token)}
								>
									Tekrar gönder
								</button>
							)}
						</React.Fragment>
					)}
				</p>
			</div>
		);
	} else {
		return '';
	}
};

export default ActiveAlert;
