
<template>
    <div class="container">
        <form @submit.prevent="handleCreateRepository">
            <input v-model="newRepoName" placeholder="Repository name" />
            <textarea v-model="newRepoDescription" placeholder="Repository description"></textarea>
            <input v-model="newRepoAuthor" placeholder="Author's name" />
            <button type="submit">Create</button>
        </form>
        <hr />
        <input v-model="localFilterText" placeholder="Filter repositories..." />
        <button @click="loadRepositories">Load Repositories</button>
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else>
            <div v-for="(repo, index) in filteredRepositories" :key="index" class="repo">
                <h1>{{ repo.full_name }}</h1>
                <p>{{ repo.description || 'No description' }}</p>
            </div>
        </div>
        <hr />
    </div>
</template>
  
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'github-repository',
    data() {
        return {
            newRepoName: '',
            newRepoDescription: '',
            newRepoAuthor: '',
            localFilterText: ''
        }
    },
    computed: {
        ...mapState(['filterText']),
        ...mapState(['isLoading']),
        ...mapState(['repositories']),
        ...mapGetters(['filteredRepositories']),
    },
    watch: {
        localFilterText(newValue) {
            this.$store.dispatch('updateFilterText', newValue);
        }
    },
    methods: {
        ...mapActions(['loadRepositories', 'createNewRepository']),
        handleCreateRepository() {
            let newRepo = {
                full_name: this.newRepoName,
                description: this.newRepoDescription,
                author: this.newRepoAuthor
            };

            this.createNewRepository(newRepo);

            this.newRepoName = '';
            this.newRepoDescription = '';
            this.newRepoAuthor = '';
        },
    }
}
</script>
  
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 800px;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
}

input,
textarea {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    border: none;
    background-color: #42b983;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #2a6857;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.loading {
    font-size: 18px;
    color: #42b983;
}

.repo {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 10px;
}

.repo h1 {
    margin: 0 0 10px;
    font-size: 20px;
    color: #333;
}

.repo p {
    margin: 0;
    color: #666;
}
</style>
  