db.persons.aggregate([
    { $match: { gender: 'female' } },
    { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } }
]).pretty()

db.persons.aggregate([
    { $match: { gender: 'female' } },
    { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
    { $sort: { totalPersons: -1 } }
]).pretty()

db.persons.aggregate([
    { $project: { _id: 0, gender: 1, fullName: { $concat: ['Hello', 'World'] } } }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            gender: 1,
            fullName: {
                $concat: [{ $toUpper: '$name.first' }, ' ', { $toUpper: '$name.last' }]
            }
        }
    }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            gender: 1,
            fullName: {
                $concat: [
                    { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
                    ' ',
                    { $toUpper: { $substrCP: ['$name.last', 0, 1] } }
                ]
            }
        }
    }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            gender: 1,
            fullName: {
                $concat: [
                    { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
                    { $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: '$name.first' }, 1] }] },
                    ' ',
                    { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
                    { $substrCP: ['$name.last', 1, { $subtract: [{ $strLenCP: '$name.last' }, 1] }] },
                ]
            }
        }
    }
]).pretty()

// using multiple aggregate function to get the next value from previous

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            email: 1,
            location: {
                type: 'Point',
                coordinates: [
                    '$location.coordinates.longitude',
                    '$location.coordinates.latitude',
                ]
            }
        }
    },
    {
        $project: {
            email: 1,
            location: 1,
            gender: 1,
            fullName: {
                $concat: [
                    { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
                    { $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: '$name.first' }, 1] }] },
                    ' ',
                    { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
                    { $substrCP: ['$name.last', 1, { $subtract: [{ $strLenCP: '$name.last' }, 1] }] },
                ]
            }
        }
    }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            email: 1,
            location: {
                type: 'Point',
                coordinates: [
                    {
                        $convert: {
                            input: '$location.coordinates.longitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    },
                    {
                        $convert: {
                            input: '$location.coordinates.latitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    }
                ]
            }
        }
    },
    {
        $project: {
            email: 1,
            location: 1,
            gender: 1,
            fullName: {
                $concat: [
                    {
                        $toUpper: {
                            $substrCP: ['$name.first', 0, 1]
                        }
                    }, {
                        $substrCP: [
                            '$name.first', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.first' }, 1
                                ]
                            }]
                    },
                    ' ',
                    {
                        $toUpper: {
                            $substrCP: ['$name.last', 0, 1]
                        }
                    },
                    {
                        $substrCP: [
                            '$name.last', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.last' }, 1
                                ]
                            }]
                    }
                ]
            }
        }
    }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            email: 1,
            location: {
                type: 'Point',
                coordinates: [
                    {
                        $toDouble: { $substrBytes: ["$location.coordinates.longitude", 0, 4] }
                    },
                    {
                        $toDouble: { $substrBytes: ["$location.coordinates.latitude", 0, 4] }
                    }
                ]
            }
        }
    },
    {
        $project: {
            email: 1,
            location: 1,
            gender: 1,
            fullName: {
                $concat: [
                    {
                        $toUpper: {
                            $substrCP: ['$name.first', 0, 1]
                        }
                    }, {
                        $substrCP: [
                            '$name.first', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.first' }, 1
                                ]
                            }]
                    },
                    ' ',
                    {
                        $toUpper: {
                            $substrCP: ['$name.last', 0, 1]
                        }
                    },
                    {
                        $substrCP: [
                            '$name.last', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.last' }, 1
                                ]
                            }]
                    }
                ]
            }
        }
    }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            email: 1,
            birthdate: {
                $convert: {
                    input: '$dob.date',
                    to: 'date',
                    onError: 0.0,
                    onNull: 0.0
                }
            },
            age: '$dob.age',
            location: {
                type: 'Point',
                coordinates: [
                    {
                        $convert: {
                            input: '$location.coordinates.longitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    },
                    {
                        $convert: {
                            input: '$location.coordinates.latitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    }
                ]
            }
        }
    },
    {
        $project: {
            email: 1,
            location: 1,
            gender: 1,
            birthdate: 1,
            age: 1,
            fullName: {
                $concat: [
                    {
                        $toUpper: {
                            $substrCP: ['$name.first', 0, 1]
                        }
                    }, {
                        $substrCP: [
                            '$name.first', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.first' }, 1
                                ]
                            }]
                    },
                    ' ',
                    {
                        $toUpper: {
                            $substrCP: ['$name.last', 0, 1]
                        }
                    },
                    {
                        $substrCP: [
                            '$name.last', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.last' }, 1
                                ]
                            }]
                    }
                ]
            }
        }
    }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            email: 1,
            birthdate: { $toDate: '$dob.date' },
            age: '$dob.age',
            location: {
                type: 'Point',
                coordinates: [
                    {
                        $convert: {
                            input: '$location.coordinates.longitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    },
                    {
                        $convert: {
                            input: '$location.coordinates.latitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    }
                ]
            }
        }
    },
    {
        $project: {
            email: 1,
            location: 1,
            gender: 1,
            birthdate: 1,
            age: 1,
            fullName: {
                $concat: [
                    {
                        $toUpper: {
                            $substrCP: ['$name.first', 0, 1]
                        }
                    }, {
                        $substrCP: [
                            '$name.first', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.first' }, 1
                                ]
                            }]
                    },
                    ' ',
                    {
                        $toUpper: {
                            $substrCP: ['$name.last', 0, 1]
                        }
                    },
                    {
                        $substrCP: [
                            '$name.last', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.last' }, 1
                                ]
                            }]
                    }
                ]
            }
        }
    }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            email: 1,
            birthdate: { $toDate: '$dob.date' },
            age: '$dob.age',
            location: {
                type: 'Point',
                coordinates: [
                    {
                        $convert: {
                            input: '$location.coordinates.longitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    },
                    {
                        $convert: {
                            input: '$location.coordinates.latitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    }
                ]
            }
        }
    },
    {
        $project: {
            email: 1,
            location: 1,
            gender: 1,
            birthdate: 1,
            age: 1,
            fullName: {
                $concat: [
                    {
                        $toUpper: {
                            $substrCP: ['$name.first', 0, 1]
                        }
                    }, {
                        $substrCP: [
                            '$name.first', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.first' }, 1
                                ]
                            }]
                    },
                    ' ',
                    {
                        $toUpper: {
                            $substrCP: ['$name.last', 0, 1]
                        }
                    },
                    {
                        $substrCP: [
                            '$name.last', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.last' }, 1
                                ]
                            }]
                    }
                ]
            }
        }
    },
    { $group: { _id: { birthYear: { $isoWeekYear: '$birthdate' } }, numPersons: { $sum: 1 } } }
]).pretty()

db.persons.aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            email: 1,
            birthdate: { $toDate: '$dob.date' },
            age: '$dob.age',
            location: {
                type: 'Point',
                coordinates: [
                    {
                        $convert: {
                            input: '$location.coordinates.longitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    },
                    {
                        $convert: {
                            input: '$location.coordinates.latitude',
                            to: 'double',
                            onError: 0.0,
                            onNull: 0.0
                        }
                    }
                ]
            }
        }
    },
    {
        $project: {
            email: 1,
            location: 1,
            gender: 1,
            birthdate: 1,
            age: 1,
            fullName: {
                $concat: [
                    {
                        $toUpper: {
                            $substrCP: ['$name.first', 0, 1]
                        }
                    }, {
                        $substrCP: [
                            '$name.first', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.first' }, 1
                                ]
                            }]
                    },
                    ' ',
                    {
                        $toUpper: {
                            $substrCP: ['$name.last', 0, 1]
                        }
                    },
                    {
                        $substrCP: [
                            '$name.last', 1, {
                                $subtract: [
                                    { $strLenCP: '$name.last' }, 1
                                ]
                            }]
                    }
                ]
            }
        }
    },
    { $group: { _id: { birthYear: { $isoWeekYear: '$birthdate' } }, numPersons: { $sum: 1 } } },
    { $sort: { numPersons: -1}}
]).pretty()