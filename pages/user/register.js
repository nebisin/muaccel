import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import mevzuatApi from '../../api/mevzuat';

const initialValues = {
	userName: '',
	email: '',
	password: '',
	passwordConfirmation: '',
};

const onSubmit = async (values) => {
	await mevzuatApi
		.post('/register', {
			userName: values.userName,
			email: values.email,
			password: values.password,
		})
		.then(function (response) {
			localStorage.setItem('userData', JSON.stringify(response.data.token));
		})
		.catch(function (error) {
			console.log(error.response.data.error);
		})
		.then(function () {
			return null;
		});
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

const validateEmail = async (value) => {
	let error;

	if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(value)) {
		return;
	}

	const response = await mevzuatApi.post('/usercheck', {
		email: value,
	});

	if (response.data.error) {
		error = 'Bu e-posta adresi kullanılıyor! Size aitse giriş yapın.';
	}

	return error;
};

const RegisterPage = () => {
	return (
		<div className="flex-container">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form className="register-form">
					<div className="form-control">
						<label htmlFor="userName">Kullanıcı Adı</label>
						<Field type="text" id="userName" name="userName" />
						<ErrorMessage name="userName">
							{(msg) => <div className="error">{msg}</div>}
						</ErrorMessage>
					</div>

					<div className="form-control">
						<label htmlFor="email">E-posta Adresi</label>
						<Field
							type="email"
							id="email"
							name="email"
							validate={validateEmail}
						/>
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
						<label htmlFor="passwordConfirmation">Şifrenizi Tekrar Girin</label>
						<Field
							type="password"
							id="passwordConfirmation"
							name="passwordConfirmation"
						/>
						<ErrorMessage name="passwordConfirmation">
							{(msg) => <div className="error">{msg}</div>}
						</ErrorMessage>
					</div>

					<button type="submit">Üye Ol</button>
				</Form>
			</Formik>
		</div>
	);
};

export default RegisterPage;
