const {i18n} = require('./next-i18next.config');


module.exports = {
    reactStrictMode: true,
    i18n,
    webpack(config) {
        config.module.rules.push(
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            prettier: false,
                            svgo: true,
                            icon: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                            },
                                        },
                                    },
                                ],
                            },
                            titleProp: true,
                        },
                    },
                ],
            })
        return config
    },
}




