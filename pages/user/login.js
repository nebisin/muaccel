import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';
import BottomBar from 'component/BottomBar';

const initialValues = {
	userName: '',
	password: '',
};

const validationSchema = Yup.object({
	userName: Yup.string().required(
		'Bir kullanıcı adı veya e-posta adresi girmelisiniz!'
	),
	password: Yup.string().required('Bir şifre girmelisiniz!'),
});

const RegisterPage = () => {
	const [suffixError, setSuffixError] = useState();
	const [submitting, setSubmitting] = useState(false);
	const { login, isLoggedIn } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		if (isLoggedIn) {
			router.push('/');
		}
	});

	const onSubmit = async (values) => {
		setSubmitting(true);
		setSuffixError('');
		await mevzuatApi
			.post(
				'/login',
				{
					userName: values.userName,
					password: values.password,
				},
			)
			.then(function (response) {
				login(response.data.token);
				router.push('/');
			})
			.catch(function (error) {
				setSuffixError(error.response.data.error);
			})
			.then(function () {
				setSubmitting(false);
				return null;
			});
	};

	return (
		<div className="flex-container">
			<div className="register-flex">
				<div className="register-header">
					<div className="register-title">Giriş Yap</div>
					<div className="register-subtitle">Mevcut hesabınıza giriş yapın</div>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					validateOnBlur={false}
					validateOnChange={false}
				>
					<Form className="register-form">
						{suffixError && (
							<div className="error suffix-error">{suffixError}</div>
						)}

						<div className="form-control">
							<label htmlFor="userName">
								Kullanıcı Adı veya E-posta Adresi
							</label>
							<Field type="text" id="userName" name="userName" />
							<ErrorMessage name="userName">
								{(msg) => <div className="error">{msg}</div>}
							</ErrorMessage>
						</div>

						<div className="form-control">
							<label htmlFor="password">Şifre</label>
							<Field type="password" id="password" name="password" />
							<ErrorMessage name="password">
								{(msg) => <div className="error">{msg}</div>}
							</ErrorMessage>
						</div>

						<button
							type="submit"
							className="login-button login-button-inner"
							disabled={submitting}
						>
							{submitting ? (
								<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
							) : (
								'Giriş Yap'
							)}
						</button>
					</Form>
				</Formik>
				<div className="register-footer">
					Bir hesabınız yok mu?{' '}
					<Link href="/user/register">
						<a>Üye olun.</a>
					</Link>
				</div>
			</div>
			<BottomBar />
		</div>
	);
};

export default RegisterPage;
