# VSCode 代码段添加

1. 按F1进入搜索框

2. 搜索 'configure User snippets' ，或者首选项进去也行 ，然后选择语言/或称后缀

3. 配置如下 Example中配置，需要换行的地方用\r 或者\n 引号要用转义字符\

   可以用一个网站工具，更加方便

   > https://snippet-generator.app/

   

```json
{
	// Place your snippets for vue here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
}
```

