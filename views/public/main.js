String.prototype.toCapitalise = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

const vm = new Vue({
    el: '#app',
    data: {
        newEnWord: '',
        newFrWord: '',
        onglet: 0, // 0: Main Menu, 1: Revision, 2: WordList
        wordList: [],
        motRevision: '',
        motTranslate: '',
        keyRevision: -1,
        boolMotTranslate: false,
        wordListNotKnow: [],
        boolAlertUnknowWord: false
    },
    computed: {

    },
    methods: {
        addWord() {
            axios.post('/api/vocabulaire', {
                enWord: this.newEnWord.trim(), frWord: this.newFrWord.trim()
            }).then(res => {
                if (res.data.status === 'success') {
                    this.wordList.push({
                        en: this.newEnWord.trim().toCapitalise(),
                        fr: this.newFrWord.trim().toCapitalise(),
                        know: false
                    })
                    this.updateWordKnow()
                    this.newEnWord = ''
                    this.newFrWord = ''
                }
            })
        },
        play() {
            if (this.wordListNotKnow.length > 0) {
                this.boolAlertUnknowWord = false
                this.boolMotTranslate = false
                let randomNumber = Math.floor(Math.random() * this.wordListNotKnow.length)
                let randomLangue = Math.floor(Math.random() * 2)
                this.keyRevision = this.wordListNotKnow[randomNumber]['key']
                this.motRevision = this.wordListNotKnow[randomNumber]['word'][['en', 'fr'][randomLangue]]
                this.motTranslate = this.wordListNotKnow[randomNumber]['word'][['en', 'fr'][(randomLangue + 1) % 2]]
            } else {
                this.boolAlertUnknowWord = true
                this.motRevision = "Add new Word !!!"
                this.motTranslate = "..."
            }
        },

        show() {
            this.boolMotTranslate = true
        },

        revision() {
            this.play()
            this.onglet = 1
        },

        knowWord(key) {
            axios.put(`/api/vocabulaire/${ key }?know=${ !this.wordList[key].know ? 1 : 0 }`)
                .then(res => {
                    if (res.data.status === 'success') {
                        this.wordList[key].know = !this.wordList[key].know
                        this.updateWordKnow()
                    }
                })
            
        },

        knowRevision() {
            this.knowWord(this.keyRevision)
            this.play()
        },

        updateWordKnow() {
            let result = []
            this.wordList.forEach((word, key) => {
                if (!word.know) result.push({ word, key })
            })
            this.wordListNotKnow = result
        }
    },
    created() {
        (async () => {
            this.wordList = (await axios.get('/api/vocabulaire')).data.result
            this.updateWordKnow()
        })()
    }
})