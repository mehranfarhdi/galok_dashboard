import styles from '../../styles/Home.module.scss'
import Image from 'next/image';
import logo from '../../../public/assets/logo.svg'
import loginImage from '../../../public/assets/loginImage.svg'
import Input from '../ui/Input';
import Button from '../ui/Button';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {loginService} from "@/services/userServices";

interface LoginPayload {
    email: string,
    password: string,
}

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string().required("password is required"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm<LoginPayload>(formOptions);
    const { errors } = formState
    const router = useRouter()


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

//     const loginUser = async ({email, password}: { email: any, password: any }) => {
//         try {
// /*
//             const {data, status} = await loginService({password: password, email: email})
// */
//
//             const data = await axios.post('http://127.0.0.1:8080/login', {
//                 email: 'steven@gmail.com',
//                 password: 'password',
//             }, {
//                 withCredentials: true, // Include this line if your server requires credentials
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // Add other headers as needed
//                 },
//             })
//                 .then(response => {
//                     // Handle the response
//                     console.log(response.data);
//                 })
//                 .catch(error => {
//                     // Handle errors
//                     console.error(error);
//                 });
//
//
//             toast.success("Logged successfully")
//             localStorage.setItem("user", JSON.stringify(data));
//             localStorage.setItem("token", "sad");
//             router.push(router.query.redirectTo as string || '/dashboard')
//         } catch (error) {
//             console.error(error);
//         }
//     };

    const loginPress = async () => {
        console.log(email, password)
        const payload = {
            email: email,
            password: password,
        }
        try {
            const { data, status } = await loginService(payload)

            if (status === 200) {
                // localStorage.setItem('User_data', JSON.stringify(data))
                localStorage.setItem('token', data)
                router.push(router.query.redirectTo as string || '/dashboard')
            }
        } catch (error) {
            console.log(error)
            // if (error.response.status === 400) {
            //     setIsloading(false)
            //     toast.error(error.response.data?.email[0])
            // }
            // if (error.response.status === 401) {
            //     setIsloading(false)
            //     toast.error(error.response.data.detail)
            // }
            // if (error.response.status === 500) {
            //     setIsloading(false)
            //     toast.error('Server error 500')
            // }
        }
    }

    const onSubmit = (data: LoginPayload) => {
        loginPress();

    };
    return (
        <section className={styles.container}>
            <div className={styles.logo}>
                {/*<Image src={logo} className={styles.logo_image} alt='Logo' />*/}
            </div>
            <div className={styles.login}>
                <div className={styles.login__image_section}>
                    <Image className={styles.login__image} src={loginImage} alt='man' />
                </div>
                <div className={styles.login__form_section}>
                    <div className={styles.login__content}>
                        <h1 className={styles.login__heading}>Welcome to Galok Broker</h1>
                        <p className={styles.login__description}>Enter details to login.</p>
                    </div>
                    <form className={`${styles.login__form}`} onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register("email")} className={styles.login__input} onChange={(e) => setEmail(e.currentTarget.value)}  placeholder='Email' name='email' />
                        <div className={styles.input__errors}>{errors.email?.message}</div>
                        <div className={styles.login__show}>
                            <Input {...register("password")}  className={`${styles.login__input} ${styles.login__input_showPassword}`} onChange={(e) => setPassword(e.currentTarget.value)}  placeholder='Password' name='password' type={showPassword ? 'text' : 'password'} />
                            <p className={styles.login__showPassword} onClick={() => handleTogglePassword()}>{showPassword ? "Hide" : "SHOW"}</p>
                            <div className={styles.input__errors}>{errors.password?.message}</div>
                        </div>
                        <Button text="log in" className={styles.register__button} type='submit' />
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;