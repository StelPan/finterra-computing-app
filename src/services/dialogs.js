import store from "../store";

export const showDialog = (name) => {
    store.dispatch("showDialog", name);
};

export const closeDialog = (name) => {
    store.dispatch("closeDialog", name);
};