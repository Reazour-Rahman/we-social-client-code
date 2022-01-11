import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input, Spinner,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/slices/userSlice';
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import './Login.css'
import useFirebase from '../../hooks/useFirebase';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';


const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const [value, setValue] = useState({ email: '', password: '' });
	const handleChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const handleSubmitData = (e) => {
		e.preventDefault();
		value.email && value.password && dispatch(fetchUser(value));
	};

	useEffect(
		() => user.data && navigate('/', { replace: true }),
		[navigate, user.data]
	);




	/* ______________________________________________________________________ */
	/* Google log in */
	const { handleGoogleLogIn, userId} = useFirebase();
    const history = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleLogIn()
        .then((result) => {
            history.replace(from);
        })
    };
	console.log(userId);
	/* ______________________________________________________________________ */



	/* Conditional Alert */
	const [startAlert, setStartAlert] = useState(false);

	const startAlertComponent = () =>{
		setStartAlert(true)
	}
	const CloseAlertComponent = () =>{
		setStartAlert(false)
	}

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy WeSocial fun{' '}
						<Box style={{display: 'inline'}} color={'blue.400'}>features</Box> ✌️
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
						{user.error && <Text align='center' mb='6' color='red.400'>{user.error}</Text>}
					<Stack as='form' onSubmit={handleSubmitData} spacing={4}>
						<FormControl id='email'>
							<FormLabel>Email address</FormLabel>
							<Input
								onChange={handleChange}
								name='email'
								value={value.email}
								type='email'
							/>
						</FormControl>
						<FormControl id='password'>
							<FormLabel>Password</FormLabel>
							<Input
								onChange={handleChange}
								name='password'
								value={value.password}
								type='password'
							/>
						</FormControl>
						<Stack spacing={10}>
							<Button
								type='submit'
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}>
								{user.loading && <Spinner size='sm' mx={2} />}
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
				<Box>
					{/* Alert for upcoming features */}

					{ startAlert ?<Alert mb={'4'} mt={'0'} status='warning'>
					<AlertIcon />
					<Box flex='1'>
						<AlertTitle>Opsssss!</AlertTitle>
						<AlertDescription display='block'>
						This feature is not available at this moment. We are lunching this feature soon. Please, Try google sign in method.
						</AlertDescription>
					</Box>
					<CloseButton onClick={CloseAlertComponent} position='absolute' right='8px' top='8px' />
					</Alert> : null
					}

					<Flex
						align={'center'}
						style={{justifyContent:"space-between"}}
					>
						<Button onClick={googleSignIn} className='auth-log' boxShadow={'lg'} bg={'white'}><FcGoogle/></Button>
						<Button onClick={startAlertComponent} className='auth-log' boxShadow={'lg'} bg={'white'}><FaGithub color={'black'}/></Button>
						<Button onClick={startAlertComponent} className='auth-log' boxShadow={'lg'} bg={'white'} color={'blue.400'}><FaFacebook/></Button>
						{/* With default value */}

					</Flex>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Login;

