module.exports = {
    preset: 'react-native',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
    ],
    moduleNameMapper: {
        '^@react-native-google-signin/google-signin$': '<rootDir>/__mocks__/react-native-google-signin/index.ts',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
