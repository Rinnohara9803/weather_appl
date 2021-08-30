// const greet = (myName = 'Anonymous') => {
//     console.log(`Hello ${myName}`)
// } 

// greet('Sagar')

const products = {
    type: 'Food',
    label: 1
}

const getProduct = (myname, {type, label = 0} = {}) => {
    console.log(myname)
    console.log(type)
    console.log(label)
}

getProduct('Sagar')