export const state = () => ({
    updateOfficeDialog: false,
    addOfficeDialog: false,
    createRegionDialog: false,
});

export const actions = {
    showDialog({ commit }, name) {
        commit("updateDialogState", { name, flag: true });
    },
    closeDialog({ commit }, name) {
        commit("updateDialogState", { name, flag: false });
    }
};

export const mutations = {
    updateDialogState(state, { name, flag }) {
        state[name] = flag;
    }
};

export const getters = {
    getUpdateOfficeDialogState(state) {
        return state.updateOfficeDialog;
    },
    getAddOfficeDialogState(state) {
        return state.addOfficeDialog;
    },
    getCreateRegionDialogState(state) {
        return state.createRegionDialog;
    }
};