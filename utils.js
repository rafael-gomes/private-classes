module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
        
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        
        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age -1
        }
    
        return age
    },

    date: function(timestamp) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },

    graduation: function(value) {
        if (value == 'medio'){
            let graduation = "Ensino Médio Completo"
            return graduation
        }
        if (value == 'superior'){
            let graduation = "Ensino Superior Completo"
            return graduation
        }
        if (value == 'mestrado'){
            let graduation = "Mestrado"
            return graduation
        }
        if (value == 'doutorado'){
            let graduation = "Doutorado"
            return graduation
        }
    },

    grade: function(value) {
        if (value == '5EF'){
            let grade = "5º Ano Ensino Fundamental"
            return grade
        }
        if (value == '6EF'){
            let grade = "6º Ano Ensino Fundamental"
            return grade
        }
        if (value == '7EF'){
            let grade = "7º Ano Ensino Fundamental"
            return grade
        }
        if (value == '8EF'){
            let grade = "8º Ano Ensino Fundamental"
            return grade
        }
        if (value == '9EF'){
            let grade = "9º Ano Ensino Fundamental"
            return grade
        }
        if (value == '1EM'){
            let grade = "1º Ano Ensino Médio"
            return grade
        }
        if (value == '2EM'){
            let grade = "2º Ano Ensino Médio"
            return grade
        }
        if (value == '3EM'){
            let grade = "3º Ano Ensino Médio"
            return grade
        }
    }

}