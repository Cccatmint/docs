let z: string;
z = 'abc'

let x: boolean;
x = true

let y: any;
y = 1
y = 'abc'
y = undefined
y = false
x = y // 类型不安全（不建议 无错误提示）

let w: unknown

// x = w // 有错误提示（建议写法 unkonwn 相当于安全的any）

// 解决错误提示的方案:
// 1.类型判断

if(typeof w === "boolean") {
    x = w
}

// 2.1断言(写法一)
x = w as boolean

// 2.2断言(写法二)
x = <boolean>w

function fn(num: number): number {
    return 10 + num
}

// void返回为空 undefined 以函数为例 表示没有返回值的函数
function fn2(): void {
    console.log('function fn2')
}

// never （很少使用，用于报错，无返回值甚至没有undefined）
function fn3(): never {
    throw new Error('错误')
}