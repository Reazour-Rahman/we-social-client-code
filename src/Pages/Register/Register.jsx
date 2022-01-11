import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slices/registerSlice';

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const register = useSelector((state) => state.register);
	console.log(register);
	const user = useSelector((state) => state.user);
	const [showPassword, setShowPassword] = useState(false);
	const [value, setValue] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const handleSubmitData = (e) => {
		e.preventDefault();
		value.email && value.password && dispatch(registerUser(value));
	};

	useEffect(
		() => user.data && navigate('/', { replace: true }),
		[navigate, user.data]
	);
	useEffect(
		() => register.data?.success && navigate('/login', { replace: true }),
		[navigate, register.data?.success]
	);

	return (
		<>
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}>
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'} textAlign={'center'}>
							Sign up
						</Heading>
						<Text fontSize={'lg'} color={'gray.600'}>
							to enjoy all of our cool features ✌️
						</Text>
					</Stack>
					<Box
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={8}>
						{register.error && (
							<Text align='center' mb='6' color='red.400'>
								{register.error}
							</Text>
						)}
						<Stack as='form' onSubmit={handleSubmitData} spacing={4}>
							<HStack>
								<FormControl id='firstName' isRequired>
									<FormLabel>First Name</FormLabel>
									<Input
										name='name'
										value={value.name}
										onChange={handleChange}
										type='text'
									/>
								</FormControl>
							</HStack>
							<FormControl id='email' isRequired>
								<FormLabel>Email address</FormLabel>
								<Input
									type='email'
									name='email'
									value={value.email}
									onChange={handleChange}
								/>
							</FormControl>
							<FormControl id='password' isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										name='password'
										value={value.password}
										onChange={handleChange}
										type={
											showPassword ? 'text' : 'password'
										}
									/>
									<InputRightElement h={'full'}>
										<Button
											variant={'ghost'}
											onClick={() =>
												setShowPassword(
													(showPassword) =>
														!showPassword
												)
											}>
											{showPassword ? (
												<ViewIcon />
											) : (
												<ViewOffIcon />
											)}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<FormControl id='email' isRequired>
								<FormLabel>Confirm Password</FormLabel>
								<Input
									name='confirmPassword'
									type='password'
									value={value.confirmPassword}
									onChange={handleChange}
								/>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									type='submit'
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}>
									{register.loading && (
										<Spinner size='sm' style={{color:"red"}} mx={2} />
									)}
									Sign up
								</Button>
							</Stack>
							<Stack pt={6}>
								<Text align={'center'}>
									Already a user?{' '}
									<NavLink to='/login' color={'blue.400'}>
										Login
									</NavLink>
								</Text>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Flex>
		</>
	);
};

export default Register;
