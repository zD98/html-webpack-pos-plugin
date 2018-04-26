# html-webpack-pos-plugin
transfer asserts to `head` and `body` by auto injecting

## Example

Webpack Config
```javascript 
plugins: [
    new HtmlWebpackPlugin({
        // ... rest options
        chunks: ['remjs', 'vendor', 'index'],
        // html-webpack-pos-plugin 
        head: ['remjs'],
        body: ['vendor', 'index']
    }),
    new HtmlWebpackPosPlugin()
]
``` 
Result 
```html
<html>
<head>
    <script src="xxx/remjs.js"></script>
</head>
<body>
    ...
    <script src="xxx/vendor.js"></script>
    <script src="xxx/index.js"></script>
</body>
</html>
```
With Inline Plugin 

``` javascript
plugins: [
    new HtmlWebpackPlugin({
        // ... rest options
        chunks: ['remjs', 'vendor', 'index'],
        // html-webpack-pos-plugin 
        head: ['remjs'],
        body: ['vendor', 'index']
        // html-webpack-inline-source-plugin
        inlineSource: 'remjs'
    }),
    new HtmlWebpackPosPlugin(),
    new HtmlWebpackInlineSourcePlugin()
]
```


