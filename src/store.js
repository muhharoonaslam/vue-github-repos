import { createStore } from 'vuex';

export default createStore({
    state: {
        repos: [],
        filterText: '',
        isLoading: false,
    },
    mutations: {
        SET_FILTER_TEXT(state, filterText) {
            state.filterText = filterText;
        },
        SET_REPOSITORIES(state, repos) {
            state.repos = repos;
        },
        SET_LOADING(state, isLoading) {
            state.isLoading = isLoading;
        },
        ADD_NEW_REPOSITORY(state, repository) {
            state.repos.push(repository);
        },
    },
    actions: {
        createNewRepository({ commit }, repository) {
            commit('ADD_NEW_REPOSITORY', repository);
        },
        updateFilterText({ commit }, filterText) {
            commit('SET_FILTER_TEXT', filterText);
        },
        loadRepositories({ commit }) {
            commit('SET_LOADING', true);
            fetch('https://api.github.com/users/Muhtasham/repos')
                .then(res => res.json())
                .then(data => {
                    commit('SET_REPOSITORIES', data);
                    commit('SET_LOADING', false);
                }).catch((e) => {
                    console.log("🚀 ~ file: store.js:28 ~ loadRepositories ~ e:", e)
                    commit('SET_LOADING', false);
                })
        }
    },
    getters: {
        filteredRepositories: state => {
            return state.repos.filter(repo =>
                (repo.name && repo.name.includes(state.filterText)) ||
                (repo.description && repo.description.includes(state.filterText))
            );
        }
    }
});

