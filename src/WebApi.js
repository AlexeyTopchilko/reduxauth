

export default async function WebAPI(type, params, address) {

    let token = localStorage.getItem('token');
    switch (type) {
        case 'GET':
            let getResponse = await fetch(address + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: 'Bearer ' + token
                }
            });
            let getData = await getResponse.json();
            return getData;

        case 'POST':
            let postResponse = await fetch(address, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: 'Bearer ' + token
                },
                body: JSON.stringify(params)
            });
            let postData = await postResponse.json();
            return postData;

        case 'PUT':
            await fetch(address + params, {
                method: 'PUT',
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            return;
    }
}