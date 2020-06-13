import { useFormik } from 'formik';
import mevzuatApi from '../../api/mevzuat';

const initialValues = {
	username: '',
	email: '',
	password: '',
	passwordconfirm: ''
};

const onSubmit = (values) => {
	console.log('Form data', values);
};

const validate = async (values) => {
	let errors = {};

	if (!values.username) {
		errors.username = 'Bir kullanıcı adı girmelisiniz!';
	} else if (values.username.length < 3) {
		errors.username = 'Kullanıcı adı en az 3 karakterden oluşmalı!';
	} else if (values.username.length > 35) {
		errors.username = 'Kullanıcı adı en fazla 35 karakterden oluşabilir!';
	}else {
		const response = await mevzuatApi.post('/usercheck', { userName: values.username });
		if(response.data.error){
			errors.username = 'Bu kullanıcı adı kullanılıyor! Size aitse giriş yapın.'
		}
	}

	if (!values.email) {
		errors.email = 'Bir e-posta adresi girmelisiniz!';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Geçerli bir e-posta adresi girmelisiniz!';
	} else {
		const response = await mevzuatApi.post('/usercheck', { email: values.email });
		if(response.data.error){
			errors.email = 'Bu e-posta adresi kullanılıyor! Size aitse giriş yapın.'
		}
	}

	if (!values.password) {
		errors.password = 'Bir şifre girmelisiniz!';
	} else if (values.password.length < 8) {
		errors.password = 'Şifreniz en az 8 karakterden oluşmalı!';
	} else if (!/^(?=.*\d).{1,}$/i.test(values.password)) {
		errors.password = 'Şifreniz en az bir rakam içermelidir!';
	} else if (!/^(?=.*[a-zçıöşü]).{1,}$/i.test(values.password)) {
		errors.password = 'Şifreniz en az bir harf içermelidir!';
	}

	if(values.password !== values.passwordconfirm) {
		errors.passwordconfirm = 'Girdiğiniz şifreler uyuşmuyor!'
	}

	return errors;
};

const RegisterPage = () => {
	const formik = useFormik({
		initialValues,
		onSubmit,
		validate,
	});

	return (
		<div className="flex-container">
			<form className="register-form" onSubmit={formik.handleSubmit}>
				<div className="form-control">
					<label htmlFor="username">Kullanıcı Adı</label>
					<input
						type="text"
						id="username"
						name="username"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
						style={
							!formik.errors.username && formik.touched.username
								? { borderColor: 'green' }
								: null
						}
					/>
					{formik.errors.username && formik.touched.username && (
						<div className="error">{formik.errors.username}</div>
					)}
				</div>

				<div className="form-control">
					<label htmlFor="email">E-posta Adresi</label>
					<input
						type="email"
						id="email"
						name="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
						style={
							!formik.errors.email && formik.touched.email
								? { borderColor: 'green' }
								: null
						}
					/>
					{formik.errors.email && formik.touched.email && (
						<div className="error">{formik.errors.email}</div>
					)}
				</div>

				<div className="form-control">
					<label htmlFor="password">Şifre</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						style={
							!formik.errors.password && formik.touched.password
								? { borderColor: 'green' }
								: null
						}
					/>
					{formik.errors.password && formik.touched.password && (
						<div className="error">{formik.errors.password}</div>
					)}
				</div>

				<div className="form-control">
					<label htmlFor="passwordconfirm">Şifrenizi Tekrar Girin</label>
					<input
						type="password"
						id="passwordconfirm"
						name="passwordconfirm"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.passwordconfirm}
						style={
							!formik.errors.passwordconfirm && formik.touched.passwordconfirm
								? { borderColor: 'green' }
								: null
						}
					/>
					{formik.errors.passwordconfirm && formik.touched.passwordconfirm && (
						<div className="error">{formik.errors.passwordconfirm}</div>
					)}
				</div>

				<button type="submit">Üye Ol</button>
			</form>
		</div>
	);
};

export default RegisterPage;
