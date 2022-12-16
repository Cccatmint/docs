const fs = require('fs');
const path = require('path');

// 设定要遍历的文件夹
const sourceFolder = '../notes';

// 定义 traverse 函数
function traverse(folder) {
    // 定义一个树形数据结构
    let tree = {
        name: folder,
        children: [],
        level: folder.match(/\\/g) ? (folder.match(/\\/g).length - 2) : (-2)
    };

    // 使用 fs.readdirSync 遍历文件夹下的文件
    const files = fs.readdirSync(folder);

    // 遍历文件夹下的所有文件
    files.forEach(file => {
        // 获取文件的完整路径
        const filePath = path.join(folder, file);

        // 判断文件是否为文件夹
        if (fs.statSync(filePath).isDirectory()) {
            // 如果是文件夹，则递归遍历该文件夹
            const subtree = traverse(filePath);

            // 如果文件夹中没有 ".md" 为后缀名的文件，则不输出该文件夹
            if (subtree.children.length > 0) {
                tree.children.push(subtree);
            }
        } else if (path.extname(file) === '.md' && !path.basename(file).startsWith('_')) {
            // 如果是 ".md" 为后缀名且不以_开头的文件，则添加到树形数据结构中
            // console.log(link)
            tree.children.push({
                name: path.basename(file, '.md'),
                link: filePath,
                level: filePath.match(/\\/g).length - 2
            });
        }
    });

    // 返回树形数据结构
    return tree;
}

tree = traverse(sourceFolder)
// 使用 traverse 函数遍历文件夹，并将结果输出
// console.log(tree);


// 根据tree生成_sidebar.md

function generateSidebarContent(arr) {
    let str = ''
    arr.forEach(item => {
        // 无子文件夹的情况
        if (!item.children) {
            str = str + `- [${item.name}](${item.link})\n`
        } else {
            // 有子文件夹的情况
            str = str + `* **${path.basename(item.name)}**\n\r` + generateSidebarContent(item.children) + '\n'
        }
    })
    return str
}

let sidebarContentStr = generateSidebarContent(tree.children)
sidebarContentStr = sidebarContentStr.replace(/\\/g, '/')
sidebarContentStr = sidebarContentStr.replace(/\.\.\//g, '')

let template = `<!-- _sidebar.md -->

$sidebarContentStr$

- **Links**
  - [GitHub](https://github.com/Cccatmint)

`

template = template.replace(/\$sidebarContentStr\$/, sidebarContentStr)
fs.writeFileSync('../_sidebar.md', template)