const fs = require('promise-fs')
const vocabulaireJson = require('../vocabulaire.json')

String.prototype.toCapitalise = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

const sendRest = result => {
    return {
        status: result instanceof Error ? 'error' : 'success',
        result: result instanceof Error ? result.message : result
    }
}

class Vocabulaire {

    static addWord(enWord, frWord) {
        if (/^[a-zA-Z]+$/.test(enWord) && /^[a-zA-Z]+$/.test(frWord)) {
            vocabulaireJson.push({
                en: enWord.toCapitalise(),
                fr: frWord.toCapitalise()
            })
            return sendRest('Add succesfuly !')
        }
        else sendRest('Syntax error word !')
    }

    static getWord(id) {
        if (id)
            if (/^[0-9]+$/.test(id)) {
                return sendRest(
                    id < vocabulaireJson.length ? vocabulaireJson[id] : vocabulaireJson[vocabulaireJson.length - 1]
                )
            }
            else return sendRest(new Error('Params errors !'))
        return sendRest(vocabulaireJson)
    }

    static deleteWord() {
        if (id && /^[0-9]+$/.test(id)) {
            let elementDelete = vocabulaireJson[id]
            vocabulaireJson = vocabulaireJson.splice(id, 1)
            return sendRest(elementDelete + ' deleted !')
        }
    }

    static sauvegarde() {
        const data = JSON.stringify(vocabulaireJson)
        console.log(data)
        fs.writeFile('./vocabulaire.json', data)
            .then(() => console.log('Saving vocabulary !'))
            .catch(err => console.log(err))
    }

}

module.exports = Vocabulaire