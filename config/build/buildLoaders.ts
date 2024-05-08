import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";


export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'


    const getSettingsForStyles = (withModules: boolean) => {
        return ['style-loader', !withModules ? 'css-loader' : {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]',
                    namedExport: false,
                }
            }
        }, "sass-loader"]
    }


    const assetLoader = {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        type: 'asset/resource'
    }

    const scssModuleLoader = {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true)
    }

    const scssLoader = {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(false)
    }


    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    return [
        assetLoader, scssLoader, scssModuleLoader, tsLoader

    ]
}