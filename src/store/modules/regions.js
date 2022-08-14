import axios from "../../plugins/axios";

export const state = () => ({
    listRegions: [],
});

export const actions = {
    async fetchSearchRegions ({ commit }) {
        const response = await axios.post("/regions");
        commit("updateRegions", response.data.regions);
    },
    async fetchCreateRegion (ctx, data) {
        await axios.post("/regions/create", data);
    }
};

export const mutations = {
    updateRegions(state, regions) {
        state.listRegions = regions;
    },
}

export const getters = {
    getListRegions(state) {
        return state.listRegions;
    }
};