const initialStore = {
    data: ""
};

const store = (state = initialStore, action) => {
    switch (action.type) {
        case "":
            return state;
        default:
            return state;
    }
}

export default store;