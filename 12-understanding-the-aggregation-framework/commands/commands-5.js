db.persons.aggregate([
    {
        $bucket: {
            groupBy: '$dob.age',
            boundaries: [0, 18, 33, 50, 80, 120],
            output: {
                numPersons: { $sum: 1 },
                average: { $avg: '$dob.age' },
                names: { $push: '$name.first' }
            }
        }
    }
]).pretty()

db.persons.aggregate([
    {
        $bucket: {
            groupBy: '$dob.age',
            boundaries: [18, 30, 40, 50, 60, 120],
            output: {
                numPersons: { $sum: 1 },
                average: { $avg: '$dob.age' },
            }
        }
    }
]).pretty()


db.persons.aggregate([
    {
        $bucketAuto: {
            groupBy: '$dob.age',
            buckets: 5,
            output: {
                numPersons: { $sum: 1 },
                average: { $avg: '$dob.age' },
            }
        }
    }
]).pretty()