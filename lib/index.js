'use strict'

module.exports = class HtmlWebpackPosPlugin {
    constructor() {}
    apply(compiler) {
        if (!compiler.hooks) {
            throw new Error('html-webpack-pos-plugin need webpacka4')
        }

        compiler.hooks.compilation.tap('HtmlWebpackPosPlugin', compilation => {
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlWebpackPosPlugin', (htmlPluginData, callback) => {
                const { head = [], body = [], inline = [] } = htmlPluginData.plugin.options
                const chunks = []
                const headTags = [].concat(htmlPluginData.head)
                const bodyTags = []
                // chunks classify
                htmlPluginData.body.forEach(function(tag) {
                    head.forEach(regexStr => {
                        if (new RegExp(regexStr).test(tag.attributes.src)) {
                            headTags.push(tag)
                        }
                    })
                    body.forEach(regexStr => {
                        if (new RegExp(regexStr).test(tag.attributes.src)) {
                            bodyTags.push(tag)
                        }
                    })
                })

                return callback(null, { ...htmlPluginData, head: headTags, body: bodyTags })
            })
        })
    }
}
