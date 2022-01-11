import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '../contexts/AuthProvider';
import theme from '../utils/theme';
import Routers from './Routers';

const App = () => {
	return (
		// <AuthProvider>
			<ChakraProvider theme={theme}>
			<Routers />
			</ChakraProvider>
		// {/* </AuthProvider> */}
	);
};

export default App;
