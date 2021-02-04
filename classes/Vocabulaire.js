const { send } = require('process')
const fs = require('promise-fs')
const vocabulaireJson = require('../assets/vocabulaire.json')

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
        if (/^[a-zA-Z àéèç'êâûîïëä]+$/.test(enWord) && /^[a-zA-Z àéèç'êâûîïëä]+$/.test(frWord)) {
            vocabulaireJson.push({
                en: enWord.toCapitalise(),
                fr: frWord.toCapitalise(),
                know: false
            })
            this.sauvegarde()
            return sendRest('Add succesfuly !')
        }
        else sendRest(new Error('Syntax error word !'))
    }

    static getWord(id) {
        if (id)
            if (/^[0-9]+$/.test(id))
                return sendRest(
                    id < vocabulaireJson.length ? vocabulaireJson[id] : vocabulaireJson[vocabulaireJson.length - 1]
                )
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

    static updateWord(id, knowValue) {
        if (id !== undefined && knowValue !== undefined)
            if (/^[0-9]+$/.test(id) && knowValue !== NaN) 
                if (id < vocabulaireJson.length) {
                    vocabulaireJson[id]['know'] = !! knowValue
                    this.sauvegarde()
                    return sendRest('Put successfully')
                }
                else return sendRest(new Error('Id too big !'))
            else return sendRest(new Error('Syntax error ergument!'))
        else return sendRest(new Error('Argument missing'))
    }

    static sauvegarde() {
        const data = JSON.stringify(vocabulaireJson, null, 6)
        fs.writeFile('./assets/vocabulaire.json', data)
            .then(() => console.log('Saving vocabulary !'))
            .catch(err => console.log(err))
    }

}

module.exports = Vocabulaire