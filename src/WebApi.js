

export default async function WebAPI(type, params, address) {

    switch (type) {
        case 'GET':
             let getResponse = await fetch(address + params, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });
             let getData = await getResponse.json();
            return getData;

        case 'POST':
             let postResponse = await fetch(address, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(params)
            });
             let postData = await postResponse.json();
            return postData;

        case 'PUT':
            await fetch(address + params, {
                method: 'PUT'
            });
            return;
    }
}