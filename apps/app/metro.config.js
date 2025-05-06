const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const path = require('path')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const rootDirectory = path.resolve(__dirname, '../..')
const config = {
    watchFolders: [rootDirectory, path.resolve(rootDirectory, 'node_modules'), path.resolve(rootDirectory, 'apps', 'app')],
    resolver: {
        unstable_enableSymlinks: true,
        unstable_enablePackageExports: true,
        sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
    },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
