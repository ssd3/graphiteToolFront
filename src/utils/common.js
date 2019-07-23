const utility = {
    gqlQueryToCleanData(data){
        let cleanData = [];
        data.warehouses.data.forEach(item => {
            cleanData.push(item.warehouse);
        })
        return cleanData;
    }
}

export {utility}