module.exports = {
    presets: [
        '@babel/preset-react',
        '@babel/preset-env',
    ],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-transform-runtime',
        [
            "import",{
                "libraryName":"antd",
                "libraryDirectory":"es",
                "style":"css"
            }
        ],
    ],
}