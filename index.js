const process = require('process')
const fs = require('fs')


// get all products
const getProducts = () => {
const sProducts = fs.readFileSync('./products.json', 'utf8')
const products = JSON.parse(sProducts)
console.log(products)
}

// add newProduct
addProduct = (name, price, weight) => {
const sProducts = fs.readFileSync('./products.json', 'utf8')
const products = JSON.parse(sProducts)
prdsArr = Object.entries(products)
// if product exist only added to weight
if(Object.keys(products).includes(name)){
   products[name].weight += weight
   console.log(`${name} - mahsulotlarga qo'shildi !` )
 return fs.writeFileSync('./products.json', JSON.stringify(products, null, 2))
}
const newProductName = name
products[newProductName] = {
    price: parseInt(price),
    weight: parseInt(weight),
    id: new Date().getTime()
}

console.log(`${newProductName} - mahsulotlarga qo'shildi !` )
fs.writeFileSync('./products.json', JSON.stringify(products, null, 2))
}

// sell product
const sellProduct = (name, wght) => {
    let y = new Date().getFullYear()
    let m = new Date().getMonth()+1
    let d =  new Date().getDate()
    const sProducts = fs.readFileSync('./products.json', 'utf8')
    const products = JSON.parse(sProducts)

    // agar mahsulot yetarli bo'lmasa
    if(wght > parseInt(products[name].weight)){
        return console.log('Mahsulot yetarli emas !')
    }

    // agar mahsulotning hammasi sotilsa
    if(wght == products[name].weight){
    console.log(`Do'konda ${name} qolmadi !`)
    products[name].weight -= wght
    const soldProducts = JSON.parse(fs.readFileSync('./soldProducts.json', 'utf8'))
    const soldPrName = name
    soldProducts[soldPrName] = {
        price: parseInt(products[name].price),
        weight: parseInt(wght),
        date: `${d}-${m}-${y}`,
        id: products[name].id
    }
    console.log(`${soldProducts[name].weight} kg ${name} sotildi !`)
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2))
    return fs.writeFileSync('./soldProducts.json', JSON.stringify(soldProducts, null, 2))
    }

    // mahsulotdan wght  kg kamayadi
    products[name].weight -= wght

    const soldProducts = JSON.parse(fs.readFileSync('./soldProducts.json', 'utf8'))
    const soldPrName = name
    soldProducts[soldPrName] = {
        price: parseInt(products[name].price),
        weight: parseInt(wght),
        date: `${d}-${m}-${y}`,
        id: products[name].id
    }

    console.log(`${soldProducts[name].weight} kg ${name} sotildi !`)
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2))
    fs.writeFileSync('./soldProducts.json', JSON.stringify(soldProducts, null, 2))
}

// get soldProducts
getSoldProducts = ()=>{
    sSoldProducts = fs.readFileSync('./soldProducts.json', 'utf8')
    soldProducts = JSON.parse(sSoldProducts)
    console.log(soldProducts)
}

// umumiy foyda 
const allIncomes = ()=>{
    sSoldProducts = fs.readFileSync('./soldProducts.json', 'utf8')
    soldProducts = JSON.parse(sSoldProducts)
    const arr = Object.values(soldProducts)
    // get all incomes - //umumiy xariddan 10 % foyda
    let incomes = 0
    arr.forEach(val => {
      incomes += val.weight * val.price * 0.1
    })
    console.log(`Umumiy foyda: ${incomes}`)
}

// get daily incomes
const dailyIncomes = date => {
    sSoldProducts = fs.readFileSync('./soldProducts.json', 'utf8')
    soldProducts = JSON.parse(sSoldProducts)
    const arr = Object.values(soldProducts)
    // sorted by days
    const sortedArray = arr.filter(el => el.date == date)
    let dailyIncomes = 0
    sortedArray.forEach(val => {
        dailyIncomes += val.weight * val.price * 0.1
    })
      console.log(`${date} - kunlik umumiy foyda: ${dailyIncomes}`)
}

// get all products' value in market
const allValue = () => {
    const sProducts = fs.readFileSync('./products.json', 'utf8')
    const products = JSON.parse(sProducts)
    const prsArr =  Object.values(products)
    let sum = 0
    prsArr.forEach(val => sum+= val.price * val.weight)
    console.log(`Qolgan mahsulotlarning umumiy soni ${prsArr.length}, qiymati: ${sum}`)
}

// get help
const help = () => {
   console.log(` 
   commands:

node index --help
node index getProducts
node index addProduct --name <productName> --price <price> --weigth <weight>
node index sellProduct --name <productName> --weigth <weight>
node index getSoldProducts
node index allIncomes   
node index dailyIncomes --date <date>
node index allValue
    `)
}

//commands:

// node index --help
// node index getProducts
// node index addProduct --name <productName> --price <price> --weigth <weight>
// node index sellProduct --name <productName> --weigth <weight>
// node index getSoldProducts
// node index allIncomes   
// node index dailyIncomes --date <date>
// node index allValue


const myArgs = process.argv.slice(2)


if(myArgs[0] == 'addProduct'){
  addProduct(myArgs[2], parseInt(myArgs[4]), parseInt(myArgs[6]))
} 

if(myArgs[0] == 'getProducts'){
    getProducts()
}

if(myArgs[0] == 'sellProduct'){
    sellProduct(myArgs[2], parseInt(myArgs[4]))
}

if(myArgs[0] == 'getSoldProducts'){
    getSoldProducts()
}

if(myArgs[0] == 'allIncomes'){
    allIncomes()
}

if(myArgs[0] == 'dailyIncomes'){
    dailyIncomes(myArgs[2])
}
if(myArgs[0] == '--help'){
    help()
}
if(myArgs[0] == 'allValue'){
 allValue()
}