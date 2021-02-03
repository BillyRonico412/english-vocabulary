const vm = new Vue({
    el: '#app',
    data: {
        newEnWord: '',
        newFrWord: '',
        onglet: 0, // 0: Main Menu, 1: Revision, 2: WordList
        wordList: []
    },
    methods: {
        addWord() {
            axios.post('/api/vocabulaire', {
                enWord: this.newEnWord, frWord: this.newFrWord
            }).then(() => {
                this.wordList.push({ en: this.newEnWord, fr: this.newFrWord })
                this.newEnWord = ''
                this.newFrWord = ''
            })
        }
    },
    created() {
        (async () => this.wordList = (await axios.get('/api/vocabulaire')).data.result)()
    }
})