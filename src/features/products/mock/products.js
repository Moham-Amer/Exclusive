const _product = {
    id: 1,
    title: 'iPhone',
    price: '1200$',
    img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
}

function generateProducts(length = 5) {
    const list = [];
    for (let index = 0; index < length; index++) {
        list.push({
            ..._product,
            id: index + 1
        });
    }
    return list;
}

export const products_mock = generateProducts(1);