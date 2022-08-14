import {
    search,
    searchById,
    create,
    update,
    // addReasons,
    // destroyReason
} from "@/services/office";

export const state = () => ({
    currentRegion: null,
    currentOffice: null,
    listOffices: [],
});

export const actions = {
    async fetchSearchOffices ({ commit }, getObject) {
        const { offices, region } = await search(getObject);
        commit("updateOfficeLists", offices);
        commit("updateCurrentRegion", region);
    },
    async fetchCurrentOffice ({ commit }, id) {
        const response = await searchById(id);
        commit("updateCurrentOffice", response);
    },
    async fetchCreateOffice(ctx, data) {
        await create(data);
    },
    async fetchUpdateOffice ({ commit }, { id, data }) {
        const response = await update(id, data);
        commit("updateCurrentOffice", response);
    },
    // async fetchUpdateOfficeReason({ commit }, { id, reason }) {
    //
    // }
};

export const mutations = {
    updateOfficeLists(state, offices) {
        state.listOffices = offices;
    },
    updateCurrentRegion(state, region) {
        state.currentRegion = region;
    },
    updateCurrentOffice(state, office) {
        state.currentOffice = office;
    }
};

export const getters = {
    getOfficeLists(state) {
        return state.listOffices;
    },
    getCurrentOffice(state) {
        return state.currentOffice;
    },
    getCurrentRegion(state) {
        return state.currentRegion
    },
    getOfficeWorkers(state) {
        if (state.currentOffice === null) {
            return [];
        }

        return state.currentOffice.office_workers;
    }
};