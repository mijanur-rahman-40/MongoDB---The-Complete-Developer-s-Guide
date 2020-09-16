db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            birthDate: {
                $toDate: '$dob.date'
            }
        }
    }
]).pretty()

db.persons.aggregate([
    { $project: { _id: 0, name: 1, birthDate: { $toDate: '$dob.date' } } },
    { $sort: { birthDate: 1 } },
    { $limit: 10 }
]).pretty()

db.persons.aggregate([
    { $project: { _id: 0, name: { $concat: ['$name.first', ' ', '$name.last'] }, birthDate: { $toDate: '$dob.date' } } },
    { $sort: { birthDate: 1 } },
    { $limit: 10 }
]).pretty()

db.persons.aggregate([
    { $project: { _id: 0, name: { $concat: ['$name.first', ' ', '$name.last'] }, birthDate: { $toDate: '$dob.date' } } },
    { $sort: { birthDate: 1 } },
    { $skip: 10 },
    { $limit: 10 }
]).pretty()

db.persons.aggregate([
    { $project: { _id: 0, name: { $concat: ['$name.first', ' ', '$name.last'] }, birthDate: { $toDate: '$dob.date' } } },
    { $sort: { birthDate: 1 } },
    { $limit: 10 },
    { $skip: 10 }
]).pretty()

db.persons.aggregate([
    { $project: { _id: 0, name: { $concat: ['$name.first', ' ', '$name.last'] }, birthDate: { $toDate: '$dob.date' } } },
    { $skip: 10 },
    { $limit: 10 },
    { $sort: { birthDate: 1 } }
]).pretty()

db.persons.aggregate([
    { $match: { gender: 'male' } },
    { $project: { _id: 0, name: { $concat: ['$name.first', ' ', '$name.last'] }, birthDate: { $toDate: '$dob.date' } } },
    { $skip: 10 },
    { $limit: 10 },
    { $sort: { birthDate: 1 } }
]).pretty()

db.persons.aggregate([
    { $project: { _id: 0, name: { $concat: ['$name.first', ' ', '$name.last'] }, birthDate: { $toDate: '$dob.date' } } },
    { $sort: { birthDate: 1 } },
    { $match: { gender: 'male' } },
    { $skip: 10 },
    { $limit: 10 },
]).pretty()

db.persons.aggregate([
    { $project: { _id: 0, gender: 1, name: { $concat: ['$name.first', ' ', '$name.last'] }, birthDate: { $toDate: '$dob.date' } } },
    { $sort: { birthDate: 1 } },
    { $match: { gender: 'male' } },
    { $skip: 10 },
    { $limit: 10 },
]).pretty()

db.persons.aggregate([
    { $match: { gender: 'male' } },
    { $project: { _id: 0, gender: 1, name: { $concat: ['$name.first', ' ', '$name.last'] }, birthDate: { $toDate: '$dob.date' } } },
    { $sort: { birthDate: 1 } },
    { $skip: 10 },
    { $limit: 10 },
]).pretty()