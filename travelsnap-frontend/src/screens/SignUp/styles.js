import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    signupScreenContainer: {
        flex: 1,
    },
    signupFormView: {
        paddingVertical: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    signupFormTextInput: {
        width: '80%',
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    signupButton: {
        width: '80%',
        marginTop: 20,
        backgroundColor: "#3897f1",
        padding: 15,
        borderRadius: 5,
    },
    loginLink: {
        marginTop: 20,
        color: "#3897f1",
        fontWeight: 'bold',
    },
});
