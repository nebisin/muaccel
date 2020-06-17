import { useState, useContext } from 'react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import AuthContext from 'context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import mevzuatApi from 'api/mevzuat';

import BottomBar from 'component/BottomBar';

const initialValues = {
	userName: '',
	email: '',
	password: '',
	passwordConfirmation: '',
};

const validationSchema = Yup.object({
	userName: Yup.string()
		.min(3, 'Kullanıcı adınız en az 3 karakterden oluşmalı!')
		.max(36, 'Kullanıcı adınız en fazla 36 karakterden oluşabilir!')
		.required('Bir kullanıcı adı girmelisiniz!'),
	email: Yup.string()
		.email('Geçerli bir e-posta adresi girmelisiniz!')
		.required('Bir e-posta adresi girmelisiniz!'),
	password: Yup.string()
		.min(8, 'Şifreniz en az 8 karakterden oluşmalı!')
		.matches(/^(?=.*\d).{1,}$/, 'Şifreniz en az bir rakam içermelidir!')
		.matches(/^(?=.*[a-zçıöşü]).{1,}$/i, 'Şifreniz en az bir harf içermelidir!')
		.required('Bir şifre girmelisiniz!'),
	passwordConfirmation: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Girdiğiniz şifreler eşleşmiyor!'
	),
});

const RegisterPage = () => {
	const [suffixError, setSuffixError] = useState();
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter()
	const {setUserData} = useContext(AuthContext);

	const onSubmit = async (values) => {
		setSuffixError('');
		setSubmitting(true);

		await mevzuatApi
			.post('/register', {
				userName: values.userName,
				email: values.email,
				password: values.password,
			})
			.then(function (response) {
				localStorage.setItem('userData', JSON.stringify(response.data.token));
				setUserData(response.data.token)
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
					<div className="register-title">Üyelik Formu</div>
					<div className="register-subtitle">muaccel.com'a katılın</div>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					<Form className="register-form">
						{suffixError && (
							<div className="error suffix-error">{suffixError}</div>
						)}

						<div className="form-control">
							<label htmlFor="userName">Kullanıcı Adı</label>
							<Field type="text" id="userName" name="userName" />
							<ErrorMessage name="userName">
								{(msg) => <div className="error">{msg}</div>}
							</ErrorMessage>
						</div>

						<div className="form-control">
							<label htmlFor="email">E-posta Adresi</label>
							<Field type="email" id="email" name="email" />
							<ErrorMessage name="email">
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

						<div className="form-control">
							<label htmlFor="passwordConfirmation">
								Şifrenizi Tekrar Girin
							</label>
							<Field
								type="password"
								id="passwordConfirmation"
								name="passwordConfirmation"
							/>
							<ErrorMessage name="passwordConfirmation">
								{(msg) => <div className="error">{msg}</div>}
							</ErrorMessage>
						</div>

						<button
							type="submit"
							className="register-button"
							disabled={submitting}
						>
							{submitting ? (
								<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
							) : (
								'Üye Ol'
							)}
						</button>
					</Form>
				</Formik>
				<div className="register-footer">
					Zaten üye misiniz?{' '}
					<Link href="/user/login">
						<a>Giriş yapın.</a>
					</Link>
				</div>
			</div>
			<BottomBar />
		</div>
	);
};

export default RegisterPage;
