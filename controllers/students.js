const fs = require('fs')
const data = require ('../data.json')
const { date, grade } = require ('../utils')

exports.index = function (req, res) {
    return res.render("students/index", { students: data.students })
}

exports.create = function (req, res) {
    return res.render('students/create')
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }

    
    const maxId = Math.max(...data.students.map(o => o.id), 0)

    birth = Date.parse(req.body.birth)
    const id = Number(maxId + 1)
 
    data.students.push({
        id,
        ...req.body,
        birth,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send ("Write file error")

        return res.redirect(`/students/${id}`)
    })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return id == student.id
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        grade: grade(foundStudent.grade),
        birth: date(foundStudent.birth).birthDay,
    }
    return res.render("students/show", { student })

}

exports.edit = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student) {
        return id == student.id
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', { student })
}

exports.update = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex) {
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        id: Number(id),
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error")
        
        return res.redirect(`/students/${id}`)
    }) 
    
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write error")

        return res.redirect('/students')
    })
}